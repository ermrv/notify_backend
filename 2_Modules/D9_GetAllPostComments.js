const database = require('./../3_SystemKernel/Database/index')



exports.allPostComments = async function (req, res) {
  try {
    const { postId, previousCommentId } = req.body;
    //get all commentids of the post
    allComments = await database.post.findOne({ _id: postId }).select('comments');
    //filter the commentId as per the request
    let commentIds;
    if (previousCommentId) {
      index = allComments.comments.indexOf(previousCommentId);
      const start=index-31<=0?0:index-31;
      commentIds = allComments.comments.slice(start,previousCommentId);

    } else {
      commentIds = allComments.comments.slice(-30);
    }

    postComments = await database.comment.find({
      _id: { $in: commentIds }
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
    console.log(error.message)
    return res.status(500).json({ error: error.message });
  }
}