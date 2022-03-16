const database = require('./../3_SystemKernel/Database/index')



exports.allSubComments = async function (req, res) {
  try {
    const { commentId } = req.body;
    subComments = await database.comment.findOne({
      _id:commentId
    }).select('subComments')
    .populate({path:"subComments",populate:{
        path:"commentBy",
        select:"name _id profilePicPath"
    }})

    return res.status(200).json(subComments.subComments);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}