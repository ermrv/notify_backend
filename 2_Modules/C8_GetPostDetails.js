const database = require('./../3_SystemKernel/Database/index')


exports.postDetails = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { postId } = req.body;

        if (postId) {
            const postData = await database.post.findOne({ _id: postId }).populate({
                path: "postingChannel",
                select: "name channelPrivacy channelCoverPicPath"
            })
                .populate({
                    path: "postingUser",
                    select: "name profilePicPath"
                }).populate({
                    path: "postContent",
                    populate: {
                        path: "postingChannel postingUser",
                        select: "name channelPrivacy channelCoverPicPath profilePicPath",
                    },

                });

            res.status(200).json(postData);

        } else {
            return res.status(500).json({ "error": "channelId is required" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message, });
    }
}