const { path } = require('express/lib/application');
const database = require('../3_SystemKernel/Database')



//get profile data of the user
exports.getSubscribedChannels = async (req, res) => {
    try {
        const userId = req.userData.userId;
        profileData = await database.user.findOne({ _id: userId }).
            select('subscribedChannels')
            .populate({ path: 'subscribedChannels', select: 'name owner channelCoverPicPath subscribers notifications description posts' })
        var response = profileData.toJSON();
        for (let channel of response.subscribedChannels) {
            channel.subscribersCount = channel.subscribers.length;
            channel.postsCount = channel.posts.length;
            delete channel.posts;
        }
        res.status(200).json(response.subscribedChannels);
    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }

}
