const database = require('./../3_SystemKernel/Database/index')


exports.sharePost = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { postId, channelId, sharedDescription } = req.body;
        if (channelId && postId) {
            const postData = await database.post.findOne({ _id: postId });
            if (postData.allowSharing == "true") {
               const postData= await database.post.create({
                    shared: "true",
                    postingChannel: channelId,
                    postingUser: userId,
                    sharedDetails: {
                        originalPostId:postId,
                        sharedDescription: sharedDescription,
                    },
                    allowCommenting: postData.allowCommenting,
                    postContent:postData.postContent._id,
                });
                //update channel
                const channelData = await database.channel.updateOne({ _id: channelId }, { $addToSet: { posts: postData._id } })
                //add post to channel subscribers
                await database.user.updateMany({_id:{$in:channelData.subscribers}},{$addToSet:{newsFeedPosts:postData._id}});
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