const express = require('express');
const router = express.Router();
const authanticateUser = require('./../3_SystemKernel/CommonUtils/TokenValidator')

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

//A4_update profile settings


module.exports = router;