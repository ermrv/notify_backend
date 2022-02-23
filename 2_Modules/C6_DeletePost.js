const database = require('./../3_SystemKernel/Database/index')


exports.deletePost = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { postId } = req.body;

        const postData = await database.post.findOne({ _id: postId });
        if (postData.postingUser == userId) {
            await database.post.deleteOne({ _id: postId })
            res.status(200).json({ "deleted": "true" });



        }
        else {
            return res.status(500).json({ "error": "you are not authorised" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}