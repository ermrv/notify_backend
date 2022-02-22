const express = require('express');
const router = express.Router();
const authanticateUser = require('./../3_SystemKernel/CommonUtils/TokenValidator');
const fileUploader=require('./../3_SystemKernel/CommonUtils/FileUploader')





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
router.post('/updateProfilePic',authanticateUser,fileUploader.userProfilePicUploader, profilePicController.updateProfilePic); //profilePic

//A4_update profile settings
const settingsController= require('./../2_Modules/A4_UpdateProfileSetting')
router.post('/getProfileSettings',authanticateUser,settingsController.getSettingsData);
router.post('/updateProfileSettings', authanticateUser, settingsController.updateSettings);//settings map

//A5_Srt default channel
const setDefaultChannelController= require('./../2_Modules/A5_SetDefaultChannel')
router.post('/setDefaultChannel',authanticateUser,setDefaultChannelController.setDefaultChannel); // channelId





//B1_create channel (owner)
const createChannelController= require('./../2_Modules/B1_CreateChannel'); 
router.post('/channel/createChannel',authanticateUser,createChannelController.createChannel);//name, description

//B2_get channel details
const getChannelDetailsController=require('./../2_Modules/B2_GetChannelDetails');
router.post('/channel/getChannelDetails',authanticateUser,getChannelDetailsController.getChannleDetails); //channelId

//B3_ update channel details (owner)
const updateChannelDetailsController= require('./../2_Modules/B3_UpdateChannelDetails');
router.post('/channel/updateChannelDetails',authanticateUser,updateChannelDetailsController.updateChannelDetails); // name, description

//B4_update channel cover pic (owner)
const updateChannelCoverPicController=require('./../2_Modules/B4_UpdateChannelCoverPic');
router.post('/channel/updateChannelCoverPic',authanticateUser,fileUploader.channelProfilePicUploader, updateChannelCoverPicController.updateChannelCoverPic); //channelCoverPic



//B5_update channel profile pic (owner)

//B6_ subscribe to channel
const subscribeToChannelController=require('./../2_Modules/B6_SubscribeToChannel');
router.post('/channel/subscribeToChannel',authanticateUser,subscribeToChannelController.subscribeToChannel);//channelId, subscribeToChannel("true"/"false")


//B7_enable channel notification
const enableChannelNotificationController=require('./../2_Modules/B7_EnableChannelNotification');
router.post("/channel/enableNotification",authanticateUser,enableChannelNotificationController.enableNotification);//channelId, enableNotification("true"/"false")


//B8_ delete channel (owner)
const deleteChannelController=require('./../2_Modules/B8_DeleteChannel');
router.post("/channel/deleteChannel",authanticateUser, deleteChannelController.deleteChannel); //channelId

//B9_ change channel privacy (owner)

//B10_set channel admins

module.exports = router;