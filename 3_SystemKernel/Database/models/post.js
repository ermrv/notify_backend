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
    postingChannel: {
        type: Schema.Types.ObjectId,
        ref: "Channel",
        require: true
    },
    postingUser: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    sharedDetails: {
        originalPostId: {
            type: Schema.Types.ObjectId,
            ref: "Post"
        },
        sharedDescription: String,
    },



    allowCommenting: {
        type: String,
        enum: ["true", "false"],
        default: "true",
    },
    allowSharing: {
        type: String,
        enum: ["true", "false"],
        default: "true",
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
    }],
    reported: [{

        type: Schema.Types.ObjectId,
        ref: "ReportedPost"

    }]

}, {
    timestamps: true,
});



var Post = mongoose.model('Post', postSchema)
module.exports = Post;