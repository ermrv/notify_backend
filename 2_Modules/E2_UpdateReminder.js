const database = require('../3_SystemKernel/Database')

exports.updateReminder = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { reminderId, time, description } = req.body;
        if (reminderId && time) {
            remindersData = await database.user.findOneAndUpdate({ _id: userId,'reminders._id': reminderId },
                { 'reminders.$.time': time, 'reminders.$.description': description }, { "new": true }).select('reminders');
            res.status(200).json(remindersData.reminders);
        }else{
            res.status(401).json({"erorr":"add required field"})
        }
    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}