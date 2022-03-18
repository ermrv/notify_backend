const express = require('express');
const router = express.Router();
const authanticateUser = require('../3_SystemKernel/CommonUtils/TokenValidator');
const fileUploader = require('../3_SystemKernel/CommonUtils/FileUploader')

//B1_create channel (owner)
const createChannelController = require('../2_Modules/B1_CreateChannel');
router.post('/createChannel', authanticateUser, createChannelController.createChannel);//name, description

//B2_get channel details
const getChannelDetailsController = require('../2_Modules/B2_GetChannelDetails');
router.post('/getChannelDetails', authanticateUser, getChannelDetailsController.getChannleDetails); //channelId

//B3_ update channel details (owner)
const updateChannelDetailsController = require('../2_Modules/B3_UpdateChannelDetails');
router.post('/updateChannelDetails', authanticateUser, updateChannelDetailsController.updateChannelDetails); // name, description

//B4_update channel cover pic (owner)
const updateChannelCoverPicController = require('../2_Modules/B4_UpdateChannelCoverPic');
router.post('/updateChannelCoverPic', authanticateUser, fileUploader.channelProfilePicUploader, updateChannelCoverPicController.updateChannelCoverPic); //channelCoverPic



//B5_update channel profile pic (owner)

//B6_ subscribe to channel
const subscribeToChannelController = require('../2_Modules/B6_SubscribeToChannel');
router.post('/subscribeToChannel', authanticateUser, subscribeToChannelController.subscribeToChannel);//channelId, subscribeToChannel("true"/"false")


//B7_enable channel notification
const enableChannelNotificationController = require('../2_Modules/B7_EnableChannelNotification');
router.post("/enableNotification", authanticateUser, enableChannelNotificationController.enableNotification);//channelId, enableNotification("true"/"false")


//B8_ delete channel (owner)
const deleteChannelController = require('../2_Modules/B8_DeleteChannel');
router.post("/deleteChannel", authanticateUser, deleteChannelController.deleteChannel); //channelId

//B9_ change channel privacy (owner)

//B10_set channel admins

//B11 get channel posts
const getChannelPostsController= require('../2_Modules/B11_GetChannelPosts');
router.post("/getChannelPosts", authanticateUser,getChannelPostsController.getChannelPosts);//channelId
module.exports = router;