const express = require('express');
const router = express.Router();
const authanticateUser = require('./../3_SystemKernel/CommonUtils/TokenValidator')
//...................................................................................................
//.....A......A......A........A........A.......A........A........A.......A........A......A......A....
//A1_login and signup
const loginController = require('./../2_Modules/A1_LoginOrSignUp');
router.post('/getOtp', loginController.sendOTP);//mobile
router.post('/verifyOtp', loginController.verifyOTP) //mobile, code
router.post('/registerNewUser', authanticateUser, loginController.registerNewUser);//name,gender

//A2_edit profile details
const profileEditController= require('./../2_Modules/A2_EditProfileDetails')
router.post('/getProfileDetails',authanticateUser, profileEditController.getProfileDetails);
router.post('/updateProfileDetails', authanticateUser, profileEditController.updateProfileDetails); //name, bio, email , gender

//A3_update profile pic
const profilePicController= require('./../2_Modules/A3_UpdateProfilePic');
router.post('/getProfilePic',authanticateUser,profilePicController.getProfilePic);
router.post('/updateProfilePic',authanticateUser,profilePicController.updateProfilePic); //profilePic

//A4_update profile settings
const settingsController= require('./../2_Modules/A4_UpdateProfileSetting')
router.post('/getProfileSettings',authanticateUser,settingsController.getSettingsData);
router.post('/updateProfileSettings', authanticateUser, settingsController.updateSettings);//settings map


//..........................................................................................
//.............B.............B............B...........B...........B...........B............B...........B
//B1_create channel (owner)
const createChannelController= require('./../2_Modules/B1_CreateChannel'); 
router.post('/createChannel',authanticateUser,createChannelController.createChannel);//name, description

//B2_edit channel details (owner)

//B3_ update channel cover pic (owner)

//B4_update channel profile pc (owner)

//B5_ set default channel (owner)

//B6_ subscribe to channel

//B7_enable notification

//B8_ delete channel (owner)

//B9_ change channel privacy (owner)

module.exports = router;