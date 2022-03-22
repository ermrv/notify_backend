const database = require('./../3_SystemKernel/Database/index')


exports.updateChannelDetails = async (req, res) => {
    try {
        const { channelId, name, description } = req.body;
        const userId = req.userData.userId;

        channelData = await database.channel.findOneAndUpdate({ _id: channelId, owner: userId }, { name: name, description: description }, { "new": true })
            .select('name owner channelCoverPicPath subscribers notifications description posts').lean();
        channelData.subscribersCount = channelData.subscribers.length;
        channelData.postsCount = channelData.posts.length;
        delete channelData.posts;
        res.status(200).json(channelData);




    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}