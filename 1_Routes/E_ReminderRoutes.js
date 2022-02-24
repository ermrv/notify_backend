const express = require('express');
const router = express.Router();
const authanticateUser = require('../3_SystemKernel/CommonUtils/TokenValidator');
const fileUploader = require('../3_SystemKernel/CommonUtils/FileUploader')

//E1_set reminder
const setReminderController= require('./../2_Modules/E1_SetReminder');
router.post('/setReminder', authanticateUser, setReminderController.setReminder); //postId, time, description

//E2_Update reminder
const updateReminderController= require('./../2_Modules/E2_UpdateReminder');
router.post('/updateReminder', authanticateUser, updateReminderController.updateReminder); //reminderId, time, description

//E3_Delete reminder
const deleteReminderController= require('./../2_Modules/E3_DeleteReminder');
router.post('/deleteReminder',authanticateUser, deleteReminderController.deleteReminder); //reminderId




module.exports = router;