const database = require('./../3_SystemKernel/Database/index')


exports.getChannleDetails = async (req, res) => {
    try {
        const { channelId } = req.body;
        channelData = await database.channel.findOne({ _id: channelId })
        .select('name owner channelCoverPicPath subscribers notifications description posts createdAt').lean();
        channelData.subscribersCount = channelData.subscribers.length;
        channelData.postsCount=channelData.posts.length;
            delete channelData.posts;
        res.status(200).json(channelData);

    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}