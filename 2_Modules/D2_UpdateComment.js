const database = require('./../3_SystemKernel/Database/index')

exports.updateComment = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { commentId, comment } = req.body;
        if (comment && commentId) {
            const commentData = await database.comment.updateOne({ _id: commentId, commentBy: userId }, { $set: { comment: comment } },)
                res.status(200).json({"updated":true});
        } else {
            return res.status(500).json({ "error": "add required field" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}