const database = require('../3_SystemKernel/Database')

exports.deleteReminder = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { reminderId } = req.body;
        if (reminderId) {
            remindersData = await database.user.findOneAndUpdate({ _id: userId }, { $pull: { reminders: { _id: reminderId } } },{"new":true}).select('reminders')
            res.status(200).json(remindersData.reminders);
        }else{
            res.status(500).json({"erorr":"add required field"})
        }
    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}