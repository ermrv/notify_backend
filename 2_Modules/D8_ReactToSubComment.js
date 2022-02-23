const database = require('./../3_SystemKernel/Database/index')

exports.reactToSubComment = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { commentId, subCommentId, liked } = req.body;
        if (commentId && liked && subCommentId) {
            if (liked == "true") {
                await database.comment.updateOne({
                    _id: commentId,
                    'subComments._id': subCommentId,
                }, {
                    $addToSet: {
                        'subComments.$.likes':userId
                    }
    
                });
                res.status(200).json({"likde":"true"});
            } else {
                await database.comment.updateOne({
                    _id: commentId,
                    'subComments._id': subCommentId,
                }, {
                    $pull: {
                        'subComments.$.likes':userId
                    }
    
                });
                res.status(200).json({});
            }
            
        } else {
            return res.status(500).json({ "error": "add required field" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}