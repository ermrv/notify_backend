const { response } = require('express');
const database = require('./../3_SystemKernel/Database/index')


exports.addSubComment = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { commentId, comment } = req.body;
        if (comment && commentId) {

            const subComments = await database.comment.findOneAndUpdate({ _id: commentId },
                { $addToSet: { subComments: { comment: comment, commentBy: userId } } }, { "new": true })
                .select("subComments")
                .populate({ path: "subComments.commentBy", select: 'name _id profilePicPath' })
            responseData = subComments.subComments.find(o=>o.comment===comment);
            res.status(200).json(responseData);
        } else {
            return res.status(500).json({ "error": "add required field" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}