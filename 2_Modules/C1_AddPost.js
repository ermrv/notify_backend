const notificationServices = require('../3_SystemKernel/NotificationServices/NotificationServices');
const { channel } = require('./../3_SystemKernel/Database/index');
const database = require('./../3_SystemKernel/Database/index')


exports.addPost = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { channelId } = req.body;
        var channelAdmins = [];
        channelAdmins = await database.channel.getChannelAdmins(channelId);
        if (channelAdmins.admins.includes(userId)) {
            const { description } = req.body;
            const files = req.files;
            if (files || description) {
                var attachments = [];
                //get the files path
                for (var file of files) {
                    attachments.push({ filePath: "/posts/attachments/" + file.filename, mimeType: file.mimetype, size: file.size });
                };

                //create post content
                const postContent = await database.postContent.create({ description: description, attachments: attachments, postingChannel: channelId, postingUser: userId });
                //create post
                const postData = await database.post.create({ postContent: postContent._id, postingChannel: postContent.postingChannel, postingUser: postContent.postingUser })
                //add post  to channel
                const channelData = await database.channel.findOneAndUpdate({ _id: channelId }, { $addToSet: { posts: postData._id } }).lean()
                //add post to channel subscribers
                await database.user.updateMany({ _id: { $in: channelData.subscribers } }, { $addToSet: { newsFeedPosts: postData._id } });
                notificationServices.sendPostNotification(postContent, postData, channelData);
                res.status(200).json(postData);
            } else {
                return res.status(500).json({ "error": "post is blank" });
            }

        }
        else {
            return res.status(500).json({ "error": "you are not authorised" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}
exports.addTextOnlyPost = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { channelId } = req.body;
        var channelAdmins = [];
        channelAdmins = await database.channel.getChannelAdmins(channelId);
        if (channelAdmins.admins.includes(userId)) {
            const { description, sharing, comments } = req.body;
            if (description) {
                var attachments = [];

                //create post content
                const postContent = await database.postContent.create({ description: description, attachments: attachments, postingChannel: channelId, postingUser: userId });
                //create post
                const postData = await database.post.create({ postContent: postContent._id, postingChannel: postContent.postingChannel, postingUser: postContent.postingUser, allowCommenting: comments, allowSharing: sharing })
                //add post  to channel
                const channelData = await database.channel.findOneAndUpdate({ _id: channelId }, { $addToSet: { posts: postData._id } }).lean()
                //add post to channel subscribers
                await database.user.updateMany({ _id: { $in: channelData.subscribers } }, { $addToSet: { newsFeedPosts: postData._id } });
                notificationServices.sendPostNotification(postContent, postData, channelData);
                res.status(200).json(postData);
            } else {
                return res.status(500).json({ "error": "post is blank" });
            }

        }
        else {
            return res.status(500).json({ "error": "you are not authorised" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}