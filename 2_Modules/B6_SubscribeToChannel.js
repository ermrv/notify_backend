const database = require('./../3_SystemKernel/Database/index')


exports.subscribeToChannel = async (req, res) => {
    try {
        const { channelId, subscribeToChannel } = req.body;
        const userId = req.userData.userId;
        //get the channel data
        const channelData = await database.channel.findOne({ _id: channelId });
        if (channelData.channelPrivacy === "private") {
            const mobile = req.userData.mobile;
            if (channelData.allowedSubscribers.includes(mobile)) {
                if (subscribeToChannel === "true") {
                    await database.channel.updateOne({ _id: channelId }, { $addToSet: { subscribers: userId } });
                    await database.user.updateOne({ _id: userId }, { $addToSet: { subscribedChannels: channelId }, });

                   return res.status(200).json({ "subscribed": "true" });
                } else {
                    await database.channel.updateOne({ _id: channelId }, { $pull: { subscribers: userId, notifications: userId } });
                    await database.user.updateOne({ _id: userId }, { $pull: { subscribedChannels: channelId } })

                    res.status(200).json({ "subscribed": "false" });
                }

            } else {
                res.status(500).json({ "message": "not allowed" });
            }

        } else {
            if (subscribeToChannel === "true") {
                await database.channel.updateOne({ _id: channelId }, { $addToSet: { subscribers: userId } });
                await database.user.updateOne({ _id: userId }, { $addToSet: { subscribedChannels: channelId }, });

                res.status(200).json({ "subscribed": "true" });
            } else {
                await database.channel.updateOne({ _id: channelId }, { $pull: { subscribers: userId, notifications: userId } });
                await database.user.updateOne({ _id: userId }, { $pull: { subscribedChannels: channelId } })

                res.status(200).json({ "subscribed": "false" });
            }
        }




    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}