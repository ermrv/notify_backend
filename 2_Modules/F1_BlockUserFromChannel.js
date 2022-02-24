const database = require('../3_SystemKernel/Database')

exports.blockUserFromChannel = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { targetUserId, block, channelId } = req.body;
        if (targetUserId && channelId && block) {
            if (block == "true")
                await database.channel.updateOne({ _id: channelId, owner: userId }, { $addToSet: { blockedUsers: targetUserId } })
            else {
                await database.channel.updateOne({ _id: channelId, owner: userId }, { $pull: { blockedUsers: targetUserId } })
            }
            res.status(200).json({});
        } else {
            res.status(401).json({ "erorr": "add required field" })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}