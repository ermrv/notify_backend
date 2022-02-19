const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const postContentSchema = new Schema({
    description: String,
    postBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    attachments: [{
        type: String,
    }]
}, { timeStamps: true })

const postSchema = new Schema({
    promoted: String,
    shared: String,
    shareDetails: {
        sharedBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        sharedDescription: String,
    },
    postContent: {
        type: postContentSchema,
        default: {}

    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]

}, { timeStamps: true });

var Post= mongoose.model('Post', postSchema)
module.exports=Post;