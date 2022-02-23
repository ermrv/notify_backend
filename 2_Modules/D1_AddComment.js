const database = require('./../3_SystemKernel/Database/index')


exports.addComment =async (req, res) =>{
    try {
        const userId = req.userData.userId;
        const { postId , comment} = req.body;
        if (comment && postId) {

            commentData = await database.comment.create({comment:comment, postId:postId, commentBy:userId});

            await database.post.updateOne({ _id: postId }, { $addToSet: { comments: commentData._id } });
            res.status(200).json(commentData);
        } else {
            return res.status(500).json({ "error": "add required field" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}