const database = require('./../3_SystemKernel/Database/index')


exports.getAllChannels = async (req, res) => {
    try {
        const userId = req.userData.userId;
        channelData = await database.user.findOne({ _id: userId }).select('channels').populate({ path: 'channels', select: 'name owner channelCoverPicPath subscribers notifications description posts' });
        var response = channelData.toJSON();
        var responseData=[];
        for (let channel of response.channels) {
            channel.subscribersCount = channel.subscribers.length;
            channel.postsCount=channel.posts.length;
            delete channel.posts;
            responseData.push(channel);
        }

        res.status(200).json(responseData);

    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}