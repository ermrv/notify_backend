const multer = require('multer');

//......................profile pic uploader.....................
const profilePicFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const profilePicStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/user/profilePics/');
    },
    filename: function (req, file, cb) {
        cb(null, "userProfilepic_" + new Date().toISOString() + file.originalname);
    }
});

module.exports.userProfilePicUploader = multer({
    storage: profilePicStorage,
    fileFilter: profilePicFilter
}).single('profilePic')

//..................................................................................................





//........................channel cover pic uploader...............................................
const channelProfilePicFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const channelProfilePicStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/channel/profilePics/');
    },
    filename: function (req, file, cb) {
        cb(null, "channelProfilepic_" + new Date().toISOString() + file.originalname);
    }
});

module.exports.channelProfilePicUploader = multer({
    storage: channelProfilePicStorage,
    fileFilter: channelProfilePicFilter
}).single('channelCoverPic')
//...............................................................................................



//....................................post attachments uploader..................................
const postAttachmentsStorage=multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/posts/attachments');
    },
    filename: function (req, file, cb) {
        cb(null, "attachment_" + new Date().toISOString() + file.originalname);
    }
});
module.exports.postAttachmentsUploader = multer({
    storage: postAttachmentsStorage,
}).array('attachment',20)