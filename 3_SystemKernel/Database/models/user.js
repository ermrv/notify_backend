const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var reminderSchema = new Schema({
    time:{
        type:Date,
        required:true,
    },
    description: String,
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required:true
    }
})
var userSchema = new Schema({
    name: String,
    gender:{
        type:String,
        enum: ['male', 'female', 'other'],
    },
    mobile: String,
    email: String,
    bio: String,
    profilePicPath:{
        type:String,
        default:"/user/profilePics/default.png",
    },
    deviceInfo: [{
        lat: String,
        lan: String,
        mac: String,
        location: String,
    }],
    settings: {


    },
    channels: [{
        type: Schema.Types.ObjectId,
        ref: "Channel"
    }],
    defaultChannel: {
        type: Schema.Types.ObjectId,
        ref: "Channel"
    },
    subscribedChannels: [{
        type: Schema.Types.ObjectId,
        ref: "Channel"
    }],
    newsFeedPosts:[{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],
    reminders: [reminderSchema]

}, { timestamps: true });

var User = mongoose.model('User', userSchema)
module.exports = User;