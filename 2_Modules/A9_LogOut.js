const database = require('../3_SystemKernel/Database')


//update device info
exports.logout = async (req, res) => {
    try {
        const userId = req.userData.userId;
            userData = await database.user.updateOne({ _id: userId }, { deviceInfo: {fcmToken:null } });
            res.status(200).json({ "updated": "true" });
    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}