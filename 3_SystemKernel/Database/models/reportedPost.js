const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var reportedPostSchema=new Schema({
    postId:{
        type:Schema.Types.ObjectId,
        ref:"Post",
        required:true,

    },
    reportingUser:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    description:{
        type:String,
        required:true,
    }
})



var ReportedPost = mongoose.model('ReportedPost', reportedPostSchema)
module.exports = ReportedPost;