const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const postSchema = new Schema({
    promoted: {
        type: String,
        require: true,
        default: "false",
    },
    shared: {
        type: String,
        require: true,
        default: "false",
    },
    shareDetails: {
        originalPostId: String,
        description: String,
        sharingChannel: {
            type: Schema.Types.ObjectId,
            ref: "Channel"
        },
        sharingUser: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },

    },
    postContent: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "PostContent"

    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]

}, { timestamps: true });

var Post = mongoose.model('Post', postSchema)
module.exports = Post;