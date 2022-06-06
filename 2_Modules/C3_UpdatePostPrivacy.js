const database = require('./../3_SystemKernel/Database/index')


exports.updatePostPrivacy = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { postId } = req.body;
        const postData = await database.post.findOne({ _id: postId });
        if (postData.postingUser == userId) {
            const { allowCommenting, allowSharing } = req.body;
                postData.allowCommenting = allowCommenting;
                postData.allowSharing=allowSharing;
                await postData.save();
                res.status(200).json({postData});


        }
        else {
            return res.status(500).json({ "error": "you are not authorised" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}