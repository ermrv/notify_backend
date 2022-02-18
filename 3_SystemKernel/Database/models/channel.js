const mongoose=require('mongoose');
const Schema = mongoose.Schema;

var channelSchema= new Schema({
    name:String,
    description:String,
    channelCoverPicPath:String,
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    admin:[{
        type:Schema.Types.ObjectId,
        ref:"User"      
    }],
    subscribers:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    posts:[{
        type:Schema.Types.ObjectId,
        ref:"Post"
    }],


});

var Channel = mongoose.Schema('Channel', channelSchema);
module.exports=Channel;