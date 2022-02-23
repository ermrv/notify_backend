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
                    attachments.push({ filePath: "/posts/attachments/" + file.filename, mimeType: file.mimetype });
                };


                const postContent = await database.postContent.create({ description: description, attachments: attachments, postingChannel: channelId, postingUser: userId });

                const postData = await database.post.create({ postContent: postContent._id, postingChannel: postContent.postingChannel, postingUser: postContent.postingUser });
                await database.channel.updateOne({ _id: channelId }, { $addToSet: { posts: postData._id } })
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