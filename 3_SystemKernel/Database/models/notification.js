const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var notificationSchema = new Schema({
    channelId: {
        type: Schema.Types.ObjectId,
        ref:"Channel"
    },
    notificationType: {
        type: String,
        enum: ['subscribers', 'subscribeRequest', 'comments', 'requestAccepted'],
    },
    notificationString:String,

}, { timeStamps: true })

var Notification=mongoose.model('Notification',notificationSchema);
module.exports=Notification;