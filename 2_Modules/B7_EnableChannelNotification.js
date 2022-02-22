const database = require('./../3_SystemKernel/Database/index')


exports.enableNotification = async (req, res) => {
    try {
        const { channelId, enableNotification } = req.body;
        const userId = req.userData.userId;
        if (enableNotification === "true") {
            await database.channel.updateOne({ _id: channelId }, { $addToSet: { notifications: userId } });


            res.status(200).json({ "enabledNotification": "true" });
        }else{
            await database.channel.updateOne({ _id: channelId }, { $pull: { notifications: userId } });


            res.status(200).json({ "enabledNotification": "false" });
        }





    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}