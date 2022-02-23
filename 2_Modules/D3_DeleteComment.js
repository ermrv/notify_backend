const database = require('./../3_SystemKernel/Database/index')

exports.deleteComment = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { postId,commentId } = req.body;
        if (commentId && postId) {
                await database.comment.deleteOne({ _id: commentId,"commentBy":userId });
                await database.post.updateOne({_id:postId},{$pull:{comments:commentId}});
                res.status(200).json({});
            
        } else {
            return res.status(500).json({ "error": "add required field" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}