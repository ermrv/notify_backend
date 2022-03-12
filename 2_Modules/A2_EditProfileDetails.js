const { path } = require('express/lib/application');
const database = require('../3_SystemKernel/Database')



//get profile data of the user
exports.getProfileDetails = async (req, res) => {
    try {
        const userId = req.userData.userId;
        profileData = await database.user.findOne({ _id: userId }).
            select('_id name gender bio defaultChannel channels subscribedChannels')
            .populate({ path: 'channels', select: '_id name channelCoverPicPath' })
            .populate({ path: 'defaultChannel', select: '_id name channelCoverPicPath'});
        res.status(200).json(profileData);
    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }

}


//update profile data of the user
exports.updateProfileDetails = async (req, res) => {
    try {
        //request
        const userId = req.userData.userId;
        const { name, gender, bio, email } = req.body;
        //system kernel
        updatedProfileData = await database.user.findOneAndUpdate({ _id: userId }, { name: name, bio: bio, gender: gender, email: email }, { "new": true });
        //response
        res.status(200).json(updatedProfileData);
    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}