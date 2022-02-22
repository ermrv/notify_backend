const database = require('../3_SystemKernel/Database')


exports.getSettingsData = async (req, res) => {
    try {
        const userId = req.userData.userId;
        settingsData = await database.user.findOne({ _id: userId }).select("settings");
        res.status(200).json(settingsData);
    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}

//update settings
exports.updateSettings = async (req, res) => {
    try {
        const userId = req.userData.userId;
        settings = {

        }
        updatedSettingsData = await database.user.findOneAndUpdate({ _id: userId }, settings, { "new": true });
        res.status(200).json(updatedSettingsData);
    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}