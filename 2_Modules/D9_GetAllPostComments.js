const database = require('./../3_SystemKernel/Database/index')



exports.allPostComments = async function (req, res) {
    try {
        const {postId}= req.body;
      postComments = await database.comment.find({
          post: postId
        })
        .populate('commentBy', 'name _id profilePicPath')
        .populate('subComments.commentBy', 'name _id profilePicPath')
  
      return res.status(200).json(postComments);
  
    } catch (error) {
      return res.status(500).json({error:error.message});
    }
  }