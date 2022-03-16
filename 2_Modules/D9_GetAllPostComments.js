const database = require('./../3_SystemKernel/Database/index')



exports.allPostComments = async function (req, res) {
  try {
    const { postId } = req.body;
    postComments = await database.comment.find({
      postId: postId
    })
      .populate('commentBy', 'name _id profilePicPath')

    var response = postComments.map((comment) => comment.toJSON());
    var responseData = [];
    for (let comment of response) {
      comment.subCommentCount = comment.subComments.length;
      delete comment.subComments;
      responseData.push(comment);
    }

    return res.status(200).json(responseData);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}