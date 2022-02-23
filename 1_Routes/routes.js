const express = require('express');
const router = express.Router();
const authanticateUser = require('./../3_SystemKernel/CommonUtils/TokenValidator');
const fileUploader = require('./../3_SystemKernel/CommonUtils/FileUploader')





//A1_login and signup
const loginController = require('./../2_Modules/A1_LoginOrSignUp');
router.post('/getOtp', loginController.sendOTP);//mobile
router.post('/verifyOtp', loginController.verifyOTP) //mobile, code
router.post('/registerNewUser', authanticateUser, loginController.registerNewUser);//name,gender

//A2_edit profile details
const profileEditController = require('./../2_Modules/A2_EditProfileDetails')
router.post('/getProfileDetails', authanticateUser, profileEditController.getProfileDetails);
router.post('/updateProfileDetails', authanticateUser, profileEditController.updateProfileDetails); //name, bio, email , gender

//A3_update profile pic
const profilePicController = require('./../2_Modules/A3_UpdateProfilePic');
router.post('/getProfilePic', authanticateUser, profilePicController.getProfilePic);
router.post('/updateProfilePic', authanticateUser, fileUploader.userProfilePicUploader, profilePicController.updateProfilePic); //profilePic

//A4_update profile settings
const settingsController = require('./../2_Modules/A4_UpdateProfileSetting')
router.post('/getProfileSettings', authanticateUser, settingsController.getSettingsData);
router.post('/updateProfileSettings', authanticateUser, settingsController.updateSettings);//settings map

//A5_Srt default channel
const setDefaultChannelController = require('./../2_Modules/A5_SetDefaultChannel')
router.post('/setDefaultChannel', authanticateUser, setDefaultChannelController.setDefaultChannel); // channelId





//B1_create channel (owner)
const createChannelController = require('./../2_Modules/B1_CreateChannel');
router.post('/channel/createChannel', authanticateUser, createChannelController.createChannel);//name, description

//B2_get channel details
const getChannelDetailsController = require('./../2_Modules/B2_GetChannelDetails');
router.post('/channel/getChannelDetails', authanticateUser, getChannelDetailsController.getChannleDetails); //channelId

//B3_ update channel details (owner)
const updateChannelDetailsController = require('./../2_Modules/B3_UpdateChannelDetails');
router.post('/channel/updateChannelDetails', authanticateUser, updateChannelDetailsController.updateChannelDetails); // name, description

//B4_update channel cover pic (owner)
const updateChannelCoverPicController = require('./../2_Modules/B4_UpdateChannelCoverPic');
router.post('/channel/updateChannelCoverPic', authanticateUser, fileUploader.channelProfilePicUploader, updateChannelCoverPicController.updateChannelCoverPic); //channelCoverPic



//B5_update channel profile pic (owner)

//B6_ subscribe to channel
const subscribeToChannelController = require('./../2_Modules/B6_SubscribeToChannel');
router.post('/channel/subscribeToChannel', authanticateUser, subscribeToChannelController.subscribeToChannel);//channelId, subscribeToChannel("true"/"false")


//B7_enable channel notification
const enableChannelNotificationController = require('./../2_Modules/B7_EnableChannelNotification');
router.post("/channel/enableNotification", authanticateUser, enableChannelNotificationController.enableNotification);//channelId, enableNotification("true"/"false")


//B8_ delete channel (owner)
const deleteChannelController = require('./../2_Modules/B8_DeleteChannel');
router.post("/channel/deleteChannel", authanticateUser, deleteChannelController.deleteChannel); //channelId

//B9_ change channel privacy (owner)

//B10_set channel admins





//C1_add post
const addPostController = require('./../2_Modules/C1_AddPost');
router.post("/post/addPost", authanticateUser, fileUploader.postAttachmentsUploader, addPostController.addPost); //channelId, description, attachments

//C2_Updade post description
const updatePostDescriptionController = require('./../2_Modules/C2_UpdatePostDescription');
router.post("/post/updateDescription", authanticateUser, updatePostDescriptionController.updatePostDescription);//postId, description

//C3_Update post prvacy
const updatePostPrivacyController = require('./../2_Modules/C3_UpdatePostPrivacy');
router.post("/post/updatePostPrivacy", authanticateUser, updatePostPrivacyController.updatePostPrivacy); //postId, allowCommenting, allowSharing

//C4_React to post
const reactToPostController = require('./../2_Modules/C4_ReactToPost');
router.post("/post/react", authanticateUser, reactToPostController.reactToPost);//postId, liked("true"/"false")

//C5_share post
const sharePostController = require('./../2_Modules/C5_SharePost');
router.post("/post/sharePost", authanticateUser, sharePostController.sharePost); //postId, channelId, description
//C6_Delete post
const deletePostController = require('./../2_Modules/C6_DeletePost');
router.post("/post/deletePost", authanticateUser, deletePostController.deletePost);//postId
//C7_Report post
const reportPostController = require('./../2_Modules/C7_ReportPost');
router.post("/post/reportpost", authanticateUser, reportPostController.reportPost); //postId, description

//C8_get post details
const getPostDetailsController = require('./../2_Modules/C8_GetPostDetails');
router.post('/post/postDetail', authanticateUser, getPostDetailsController.postDetails); //postId


//D1_add comment
const addCommentController = require("./../2_Modules/D1_AddComment");
router.post('/comment/addComment', authanticateUser, addCommentController.addComment); //postId, comment
//D2_update comment
const updateCommentController = require('./../2_Modules/D2_UpdateComment');
router.post('/comment/updateComment', authanticateUser, updateCommentController.updateComment);//commentId, comment
//D3_delete comment
const deleteCommentController = require('./../2_Modules/D3_DeleteComment');
router.post('/comment/deleteComment', authanticateUser, deleteCommentController.deleteComment);//commentId postId
//D4_add subcomment
const addSubCommentController = require('./../2_Modules/D4_AddSubComment');
router.post('/comment/addSubComment', authanticateUser, addSubCommentController.addSubComment);//commentId, comment
//D5_update subcomment
const updateSubCommentController= require('./../2_Modules/D5_UpdateSubComment');
router.post('/comment/updateSubComment',authanticateUser, updateSubCommentController.updateSubComment); //commentId, subCommentId, comment
//D6_delete subcomment
const deleteSubCommentController= require('./../2_Modules/D6_DeleteSubComment');
router.post('/comment/deleteSubComment', authanticateUser, deleteSubCommentController.deleteSubComment); //commentId, subCommentId
//D7_react to comment
const reactToCommentController = require('./../2_Modules/D7_ReactToComment');
router.post('/comment/reactToComment',authanticateUser, reactToCommentController.reactToComment);//commentId, liked
//D8_react to subcomment
const reactToSubCommentController= require('./../2_Modules/D8_ReactToSubComment');
router.post('/comment/reactToSubComment', authanticateUser, reactToSubCommentController.reactToSubComment); //commentId, subCommentId, liked





module.exports = router;
