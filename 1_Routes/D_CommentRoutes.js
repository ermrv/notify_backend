const express = require('express');
const router = express.Router();
const authanticateUser = require('../3_SystemKernel/CommonUtils/TokenValidator');
const fileUploader = require('../3_SystemKernel/CommonUtils/FileUploader')

//D1_add comment
const addCommentController = require("../2_Modules/D1_AddComment");
router.post('/addComment', authanticateUser, addCommentController.addComment); //postId, comment
//D2_update comment
const updateCommentController = require('../2_Modules/D2_UpdateComment');
router.post('/updateComment', authanticateUser, updateCommentController.updateComment);//commentId, comment
//D3_delete comment
const deleteCommentController = require('../2_Modules/D3_DeleteComment');
router.post('/deleteComment', authanticateUser, deleteCommentController.deleteComment);//commentId postId
//D4_add subcomment
const addSubCommentController = require('../2_Modules/D4_AddSubComment');
router.post('/addSubComment', authanticateUser, addSubCommentController.addSubComment);//commentId, comment
//D5_update subcomment
const updateSubCommentController= require('../2_Modules/D5_UpdateSubComment');
router.post('/updateSubComment',authanticateUser, updateSubCommentController.updateSubComment); //commentId, subCommentId, comment
//D6_delete subcomment
const deleteSubCommentController= require('../2_Modules/D6_DeleteSubComment');
router.post('/deleteSubComment', authanticateUser, deleteSubCommentController.deleteSubComment); //commentId, subCommentId
//D7_react to comment
const reactToCommentController = require('../2_Modules/D7_ReactToComment');
router.post('/reactToComment',authanticateUser, reactToCommentController.reactToComment);//commentId, liked
//D8_react to subcomment
const reactToSubCommentController= require('../2_Modules/D8_ReactToSubComment');
router.post('/reactToSubComment', authanticateUser, reactToSubCommentController.reactToSubComment); //commentId, subCommentId, liked
//D9_get all post comments
const getAllPostCommentsController= require("./../2_Modules/D9_GetAllPostComments");
router.post('/getPostComments', authanticateUser, getAllPostCommentsController.allPostComments); //postId
//D10_get all subcomments
const getSubCommentsController=require('./../2_Modules/D10_GetAllSubComments');
router.post('/getSubComments',authanticateUser,getSubCommentsController.allSubComments); //commentId


module.exports = router;