const database = require('./../3_SystemKernel/Database/index')
const notificationServices = require('../3_SystemKernel/NotificationServices/NotificationServices');



exports.sharePost = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { postId, channelId, sharedDescription } = req.body;
        if (channelId && postId) {
            const originalPostData = await database.post.findOne({ _id: postId }).lean();
            if (originalPostData.allowSharing == "true") {
               const postData= await database.post.create({
                    shared: "true",
                    postingChannel: channelId,
                    postingUser: userId,
                    sharedDetails: {
                        originalPostId:postId,
                        sharedDescription: sharedDescription,
                    },
                    allowCommenting: originalPostData.allowCommenting,
                    postContent:originalPostData.postContent._id,
                });
                //update channel
                const channelData = await database.channel.findOneAndUpdate({ _id: channelId }, { $addToSet: { posts: postData._id } }).lean()
                //add post to channel subscribers
                await database.user.updateMany({_id:{$in:channelData.subscribers}},{$addToSet:{newsFeedPosts:postData._id}});
                notificationServices.sendPostNotification({},postData,channelData);
                return res.status(200).json({ "shared": "true" });
            }
            else {

                return res.status(500).json({ "error": "action not allowed" });
            }
        }else{
            return res.status(500).json({ "error": "channelId is required" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}