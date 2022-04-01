const database = require('./../3_SystemKernel/Database/index')


exports.searchForChannels = async (req, res) => {
    try {
        const { searchQuery } = req.body;
        channelData = await database.channel.find({
            name: { "$regex": searchQuery, "$options": "i" }
        })
            .select('name owner channelCoverPicPath subscribers notifications description posts')
        var temp = channelData.map((channel) => channel.toJSON());
        var responseData = [];
        for (let channel of temp) {
            channel.subscribersCount = channel.subscribers.length;
            channel.postsCount = channel.posts.length;
            delete channel.posts;
            responseData.push(channel);
        }

        res.status(200).json(responseData);

    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}