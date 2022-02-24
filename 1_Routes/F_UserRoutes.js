const express = require('express');
const router = express.Router();
const authanticateUser = require('../3_SystemKernel/CommonUtils/TokenValidator');

//F1_block user
const blockUserFromChannelController= require('./../2_Modules/F1_BlockUserFromChannel');
router.post('/block',authanticateUser,blockUserFromChannelController.blockUserFromChannel); //targetUserId //channelId //block("true"/"false")


module.exports = router;