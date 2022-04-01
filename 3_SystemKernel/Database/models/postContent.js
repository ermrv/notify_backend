
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attachmentSchema = new Schema({
    filePath: String,
    mimeType: String,
    size: String
})

const postContentSchema = new Schema({
    description: {
        type: String,
    },
    postingChannel: {
        type: Schema.Types.ObjectId,
        ref: "Channel"
    },
    postingUser: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    attachments: [{
        type: attachmentSchema,
    }]
}, { timestamps: true });

var PostContent = mongoose.model('PostContent', postContentSchema);
module.exports = PostContent;