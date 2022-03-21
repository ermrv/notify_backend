const database = require('./../3_SystemKernel/Database/index')

exports.setDefaultChannel = async (req, res) => {

    try {
        const { channelId } = req.body;
        const userId = req.userData.userId;
        const channelOwnerId = await database.channel.getChannelOwner(channelId);
        if (userId === channelOwnerId) {
            userData = await database.user.updateOne({ _id: userId }, { defaultChannel: channelId });
            res.status(200).json({"updated":true});
        } else {
            res.status(500).json({ "error": "you are not authorised to do this action","updated":false });
        }



    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}