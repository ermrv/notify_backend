const database = require('./../3_SystemKernel/Database/index')

exports.updateSubComment = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const {commentId, subCommentId, comment } = req.body;
        if (commentId && comment && subCommentId) {
            const commentData = await database.comment.findOneAndUpdate({
                 _id: commentId,
                'subComments._id': subCommentId,
                'subComments.commentBy': userId },{
                    'subComments.$.comment':comment
                }, {"new":true});
            res.status(200).json(commentData);
        } else {
            return res.status(500).json({ "error": "add required field" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}