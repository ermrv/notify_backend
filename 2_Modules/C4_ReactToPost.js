const { sendNotification } = require('../3_SystemKernel/NotificationServices/NotificationServices');
const database = require('./../3_SystemKernel/Database/index')


exports.reactToPost = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { postId, liked } = req.body;
        if (liked == "true") {
            const postData = await database.post.updateOne({ _id: postId }, { $addToSet: { likes: userId } });
            sendNotification();
            return res.status(200).json({ "liked": "true" });
        }
        else {
            const postData = await database.post.updateOne({ _id: postId }, { $pull: { likes: userId } });
            return res.status(200).json({ "liked": "false" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}