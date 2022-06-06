const database = require('./../3_SystemKernel/Database/index')


exports.updatePostPrivacy = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { postId,sharing,comments } = req.body;
        await database.post.updateOne({ _id: postId, postingUser: userId }, {
            allowCommenting: comments,
            allowSharing: sharing
        });

        res.status(200).json({ "updated": true });




    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}