const database = require('./../3_SystemKernel/Database/index')


exports.getChannleDetails = async (req, res) => {
    try {
        const { channelId } = req.body;
        channelData = await database.channel.findOne({ _id: channelId }).lean();
        res.status(200).json(channelData);

    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}