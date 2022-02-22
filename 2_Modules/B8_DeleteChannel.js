const database = require('./../3_SystemKernel/Database/index')


exports.deleteChannel = async (req, res) => {
    try {
        const { channelId } = req.body;
        const userId = req.userData.userId;
        const channelOwnerId = await database.channel.getChannelOwner(channelId);
        if (userId === channelOwnerId) {
            await database.channel.deleteOne({ _id: channelId });
            res.status(200);
        } else {
            res.status(500).json({ "error": "you are not authorised to do this action" });
        }



    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}