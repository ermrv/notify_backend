const database = require('./../3_SystemKernel/Database/index')


exports.updateChannelDetails = async (req, res) => {
    try {
        const { channelId, name, description } = req.body;
        const userId = req.userData.userId;
        const channelOwnerId = await database.channel.getChannelOwner(channelId);
        if (userId === channelOwnerId) {
            channelData = await database.channel.findOneAndUpdate({ _id: channelId }, { name: name, description: description }, { "new": true });
            res.status(200).json(channelData);
        } else {
            res.status(500).json({ "error": "you are not authorised to do this action" });
        }



    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}