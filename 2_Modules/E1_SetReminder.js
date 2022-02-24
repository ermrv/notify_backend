const database = require('../3_SystemKernel/Database')

exports.setReminder = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { postId, time, description } = req.body;
        if (postId && time && description) {
            const reminder = {
                postId: postId,
                time: time,
                description: description,
            }
            remindersData = await database.user.findOneAndUpdate({ _id: userId }, { $addToSet: { reminders: reminder } }, { "new": true }).select('reminders');
            res.status(200).json(remindersData);
        }else{
            res.status(401).json({"erorr":"add required field"})
        }
    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}