const database = require('../3_SystemKernel/Database')


//get profile pic
exports.getProfilePic = async (req, res) => {
    try {
        const userId = req.userData.userId;

        const profilePicPath = await database.user.findOne({ _id: userId }).select('profilePicPath');
        res.status(200).json(profilePicPath);
    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}


//update profile pic
exports.updateProfilePic = async (req, res) => {
    try {
        const userId=req.userData.userId;
        const profilePicPath = "/user/profilePics/" + req.file.filename
        if(profilePicPath){
          await database.user.updateOne({_id:userId},{profilePicPath:profilePicPath}).select('profilePicPath');
          res.status(200).json(profilePicPath);
        }else{
             res.status(500);
        }
    } catch (error) {
        return res.status(500).json({ error: error.message, });u
    }

}