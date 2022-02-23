const database = require('./../3_SystemKernel/Database/index')

exports.updateComment = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { commentId, comment } = req.body;
        if (comment && commentId) {
            const commentData = await database.comment.findOne({ _id: commentId });
            if (commentData.commentBy == userId) {
                commentData.comment = comment;
                commentData.save();
                res.status(200).json(commentData);
            } else {
                return res.status(401).json({ "error": "not authorised"})
            }
        } else {
            return res.status(500).json({ "error": "add required field" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}