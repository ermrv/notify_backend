const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var subCommentSchema = new Schema({
    type:{
        type:String,
        default:"subComment"
    },
    comment: {
        type: String,
        required: true,
    },
    commentBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],

}, {
    timestamps: true
});
var commentSchema = new Schema({
    type:{
        type:String,
        default:"comment"
    },
    comment: {
        type: String,
        required: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    commentBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    subComments: [subCommentSchema],

}, {
    timestamps: true
});
var Comment = mongoose.model("Comment", commentSchema);
module.exports=Comment;