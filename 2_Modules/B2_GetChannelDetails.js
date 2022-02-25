const database = require('./../3_SystemKernel/Database/index')


exports.getChannleDetails = async (req, res) => {
    try {
        const { channelId } = req.body;
        channelData = await database.channel.findOne({ _id: channelId }).select('name owner channelCoverPicPath subscribers').lean();
        subscribersCount=channelData.subscribers.length;
        channelData.subscribersCount=subscribersCount;
        delete channelData.subscribers;
        res.status(200).json(channelData);

    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}