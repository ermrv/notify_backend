const database = require('./../3_SystemKernel/Database/index')

exports.reactToComment = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { commentId, liked } = req.body;
        if (commentId && liked) {
            if (liked == "true") {
                await database.comment.updateOne({
                    _id: commentId,
                }, { $addToSet: { likes: userId } });
                return res.status(200).json({"liked":"true"})
            } else {
                await database.comment.updateOne({
                    _id: commentId,
                }, { $pull: { likes: userId } });
                return res.status(200).json({})
            }
        } else {
            return res.status(500).json({ "error": "add required field" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}