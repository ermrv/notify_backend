const mongoose=require('mongoose');
const Schema = mongoose.Schema;

var userSchema= new Schema({
    name:String,
    mobile:String,
    email:String,
    bio:String,
    profilePicPath:String,
    deviceInfo:[{
           lat:String,
           lan:String,
           mac:String,
           location:String,
    }],
    settings:{
       
    },
    channels:[{
        type:Schema.Types.ObjectId,
        ref:"Channel"
    }],
    subscribedChannels:[{
        type: Schema.Types.ObjectId,
        ref:"Channel"
    }],

});

//create new user
userSchema.statics.createNewUser= async function(){

};

//update user data
userSchema.statics.updateUserData=async function(){

};

//get user data
userSchema.statics.getUserData= async function(){

};

var User=mongoose.model('User',userSchema)
module.exports=User;