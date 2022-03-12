const express = require('express');
const router = express.Router();
const authanticateUser = require('../3_SystemKernel/CommonUtils/TokenValidator');
const fileUploader = require('../3_SystemKernel/CommonUtils/FileUploader')


//A1_login and signup
const loginController = require('../2_Modules/A1_LoginOrSignUp');
router.post('/getOtp', loginController.sendOTP);//mobile
router.post('/verifyOtp', loginController.verifyOTP) //mobile, code
router.post('/registerNewUser', authanticateUser, loginController.registerNewUser);//name,gender

//A2_edit profile details
const profileEditController = require('../2_Modules/A2_EditProfileDetails')
router.post('/getProfileDetails', authanticateUser, profileEditController.getProfileDetails);
router.post('/updateProfileDetails', authanticateUser, profileEditController.updateProfileDetails); //name, bio, email , gender

//A3_update profile pic
const profilePicController = require('../2_Modules/A3_UpdateProfilePic');
router.post('/getProfilePic', authanticateUser, profilePicController.getProfilePic);
router.post('/updateProfilePic', authanticateUser, fileUploader.userProfilePicUploader, profilePicController.updateProfilePic); //profilePic

//A4_update profile settings
const settingsController = require('../2_Modules/A4_UpdateProfileSetting')
router.post('/getProfileSettings', authanticateUser, settingsController.getSettingsData);
router.post('/updateProfileSettings', authanticateUser, settingsController.updateSettings);//settings map

//A5_Set default channel
const setDefaultChannelController = require('../2_Modules/A5_SetDefaultChannel')
router.post('/setDefaultChannel', authanticateUser, setDefaultChannelController.setDefaultChannel); // channelId

//A6_get all channels
const getAllChannelsController= require("../2_Modules/A6_GetAllChannels")
router.post('/getAllChannels',authanticateUser,getAllChannelsController.getAllChannels);

module.exports = router;