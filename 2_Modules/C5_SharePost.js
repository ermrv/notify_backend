const database = require('./../3_SystemKernel/Database/index')


exports.sharePost = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { postId, channelId, description } = req.body;
        console.log(req.body);
        if (channelId) {
            const postData = await database.post.findOne({ _id: postId });
            if (postData.allowSharing == "true") {
                const originalPostId=postData.shared=="true"?postData.sharedDetails.originalPostId:postData._id;
                await database.post.create({
                    shared: "true",
                    postingChannel: channelId,
                    postingUser: userId,
                    sharedDetails: {
                        originalPostId:originalPostId,
                        sharedDescription: description,
                    },
                    allowCommenting: postData.allowCommenting,
                    postContent: postData.postContent,
                });
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