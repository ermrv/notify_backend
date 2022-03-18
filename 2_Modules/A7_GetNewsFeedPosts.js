const database = require('./../3_SystemKernel/Database/index')


exports.getNewsFeedPosts = async (req, res) => {
    try {
        const userId = req.userData.userId;
        posts=await database.user.findOne({_id:userId}).select('newsFeedPosts').lean();
        postsContent = await database.post.find({})
            .select('_id promoted shared postingChannel postingUser sharedDetails allowCommenting allowSharing postContent likes comments createdAt updatedAt')
            .populate({
                path: "postingChannel",
                select: "name channelPrivacy channelCoverPicPath"
            })
            .populate({
                path: "postingUser",
                select: "name profilePicPath"
            }).populate({
                path: "postContent",
                populate: {
                    path: "postingChannel postingUser",
                    select: "name channelPrivacy channelCoverPicPath profilePicPath",
                },

            });
        var temp = postsContent.map((post) => post.toJSON());
        var responseData = [];
        for (let post of temp) {
            post.commentsCount = post.comments.length;
            delete post.comments;
            responseData.push(post);
        }

        res.status(200).json(responseData);

    } catch (error) {
        return res.status(500).json({ error: error.message, });
    }
}