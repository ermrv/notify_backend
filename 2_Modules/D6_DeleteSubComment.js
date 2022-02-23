const database = require('./../3_SystemKernel/Database/index')

exports.deleteSubComment = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { commentId,subCommentId} = req.body;
        if (commentId) {
            
            removesubComment = await database.comment.findOneAndUpdate({
                _id: commentId,
                'subComments.commentBy': userId,
              }, {
                $pull: {
                  subComments: {
                    _id: subCommentId
                  }
                }
              }, {
                new: true
              })
                res.status(200).json({});
            
        } else {
            return res.status(500).json({ "error": "add required field" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}