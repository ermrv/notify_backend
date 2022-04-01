const database = require('./../3_SystemKernel/Database/index')


exports.updatePostDescription = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { postId } = req.body;

        const postData = await database.post.findOne({ _id: postId });
        if (postData.postingUser == userId) {
            const { description } = req.body;
            if (postData.shared == "true") {

                postData.sharedDetails.sharedDescription = description;
                await postData.save();
                res.status(200).json({ description });
            } else {
                const postContent = await database.postContent.updateOne({ _id: postData.postContent }, { description: description });
                res.status(200).json({ description });
            }



        }
        else {
            return res.status(500).json({ "error": "you are not authorised" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}