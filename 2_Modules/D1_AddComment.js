const { response } = require('express');
const database = require('./../3_SystemKernel/Database/index')


exports.addComment = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { postId, comment } = req.body;
        if (comment && postId) {

            commentData = await database.comment.create({ comment: comment, postId: postId, commentBy: userId });
            await database.post.updateOne({ _id: postId }, { $addToSet: { comments: commentData._id } });
            temp = await commentData.populate(['commentBy', { path: "commentBy", select: 'name _id profilePicPath' }])
            responseData = temp.toJSON();
            responseData.subCommentCount = responseData.subComments.length;
            delete responseData.subComments;
            res.status(200).json(responseData);
        } else {
            return res.status(500).json({ "error": "add required field" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}