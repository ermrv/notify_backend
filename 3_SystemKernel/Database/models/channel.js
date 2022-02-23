const mongoose = require('mongoose');
const Schema = mongoose.Schema;



var channelSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    channelPrivacy:{
        type:String,
        enum:["private", "public"],
        default:"public"
    },
    description: String,
    channelCoverPicPath:{
        type:String,
        default:"/channel/profilePics/default.png"
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    admins: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    subscribers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],
    notifications: [{
        type: Schema.Types.ObjectId,
        ref: "Notification"
    }]


}, { timestamps: true });


//get channel owner
channelSchema.statics.getChannelOwner=async function(channelId){
   const channelOwnerId= await this.findOne({ _id: channelId }).select("owner");
   return channelOwnerId.owner.toString();
}

//get channel admins
channelSchema.statics.getChannelAdmins= async function (channelId){
    const channelAdminsId= await this.findOne({_id:channelId}).select("admins");
    return channelAdminsId;
}

var Channel = mongoose.model('Channel', channelSchema);
module.exports = Channel;