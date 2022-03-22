const database = require('../3_SystemKernel/Database')

exports.getAllReminders = async (req, res) => {
    try {
        const userId = req.userData.userId;
            remindersData = await database.user.findOne({ _id: userId }).select('reminders');
            res.status(200).json(remindersData.reminders);
        
    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}