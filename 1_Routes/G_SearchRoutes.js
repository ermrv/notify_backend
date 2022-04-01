const express = require('express');
const router = express.Router();
const authanticateUser = require('../3_SystemKernel/CommonUtils/TokenValidator');

//F1_block user
const searchForChannelsController= require('./../2_Modules/G1_SearchForChannels');
router.post('/searchForChannels',authanticateUser,searchForChannelsController.searchForChannels); //searchQuery


module.exports = router;