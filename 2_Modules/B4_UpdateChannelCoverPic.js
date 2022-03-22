const database = require('../3_SystemKernel/Database')


//update channel cover pic
exports.updateChannelCoverPic = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { channelId } = req.body;
        const channelCoverPicPath = "/channel/profilePics/" + req.file.filename
        if (channelCoverPicPath) {
            await database.channel.updateOne({ _id: channelId, owner: userId }, { channelCoverPicPath: channelCoverPicPath });
            res.status(200).json(channelCoverPicPath);
        } else {
            res.status(500);
        }
    } catch (error) {
        return res.status(500).json({ error: error.message, }); u
    }

}