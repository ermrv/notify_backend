const database = require('./../3_SystemKernel/Database/index')


exports.updatePostDescription = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { postId } = req.body;
        console.log(req.body);
        const postData = await database.post.findOne({ _id: postId });
        if (postData.postingUser == userId) {
            const { description } = req.body;
            if (postData.shared == "true") {
                postData.shareDetails.description = description;
                await postData.save();
                res.status(200).json({postData});
            } else {
                const postContent = await database.postContent.findOne({ _id: postData.postContent });
                postContent.description = description;
                await postContent.save();
                res.status(200).json({postContent});
            }



        }
        else {
            return res.status(500).json({ "error": "you are not authorised" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}