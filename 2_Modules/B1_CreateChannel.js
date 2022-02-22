const database = require('./../3_SystemKernel/Database/index')


exports.createChannel = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { name, description } = req.body;
        if (name) {

            channelData = await database.channel.create({ name: name, description: description, owner: userId, admins: [userId], });

            user = await database.user.findOneAndUpdate({ _id: userId }, { $addToSet: { channels: channelData._id } });
            res.status(200).json(channelData);
        } else {
            return res.status(500).json({ "error": "name is required" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}