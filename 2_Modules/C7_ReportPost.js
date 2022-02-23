const database = require('./../3_SystemKernel/Database/index')


exports.reportPost = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { postId, description } = req.body;

      const reportedData = await database.reportedPost.create({
          postId:postId,
          reportingUser:userId,
          description:description
      })
      await database.post.updateOne({_id:postId},{$addToSet:{reported:reportedData._id}})
            res.status(200).json({ "reported": "true" });



        
    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}