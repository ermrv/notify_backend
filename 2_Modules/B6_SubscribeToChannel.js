const database = require('./../3_SystemKernel/Database/index')


exports.subscribeToChannel = async (req, res) => {
    try {
        const { channelId, subscribeToChannel } = req.body;
        const userId = req.userData.userId;
        if (subscribeToChannel === "true") {
            await database.channel.updateOne({ _id: channelId }, { $addToSet: { subscribers: userId } });
            await database.user.updateOne({ _id: userId }, { $addToSet: { subscribedChannels: channelId }, });

            res.status(200).json({ "subscribed": "true" });
        } else {
            await database.channel.updateOne({ _id: channelId }, { $pull: { subscribers: userId } });
            await database.user.updateOne({ _id: userId }, { $pull: { subscribedChannels: channelId } })

            res.status(200).json({ "subscribed": "false" });
        }




    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}