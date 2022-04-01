const express = require('express');
const router = express.Router();
const authanticateUser = require('../3_SystemKernel/CommonUtils/TokenValidator');
const fileUploader = require('../3_SystemKernel/CommonUtils/FileUploader')

//C1_add post
const addPostController = require('../2_Modules/C1_AddPost');
router.post("/addPost", authanticateUser, fileUploader.postAttachmentsUploader, addPostController.addPost); //channelId, description, attachments
router.post('/addTextOnlyPost',authanticateUser,addPostController.addTextOnlyPost); //channelId,description
//C2_Updade post description
const updatePostDescriptionController = require('../2_Modules/C2_UpdatePostDescription');
router.post("/updateDescription", authanticateUser, updatePostDescriptionController.updatePostDescription);//postId, description

//C3_Update post prvacy
const updatePostPrivacyController = require('../2_Modules/C3_UpdatePostPrivacy');
router.post("/updatePostPrivacy", authanticateUser, updatePostPrivacyController.updatePostPrivacy); //postId, allowCommenting, allowSharing

//C4_React to post
const reactToPostController = require('../2_Modules/C4_ReactToPost');
router.post("/react", authanticateUser, reactToPostController.reactToPost);//postId, liked("true"/"false")

//C5_share post
const sharePostController = require('../2_Modules/C5_SharePost');
router.post("/sharePost", authanticateUser, sharePostController.sharePost); //postId, channelId, description
//C6_Delete post
const deletePostController = require('../2_Modules/C6_DeletePost');
router.post("/deletePost", authanticateUser, deletePostController.deletePost);//postId
//C7_Report post
const reportPostController = require('../2_Modules/C7_ReportPost');
router.post("/reportpost", authanticateUser, reportPostController.reportPost); //postId, description

//C8_get post details
const getPostDetailsController = require('../2_Modules/C8_GetPostDetails');
router.post('/postDetail', authanticateUser, getPostDetailsController.postDetails); //postId


module.exports = router;