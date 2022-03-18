const database = require('./../3_SystemKernel/Database/index')


exports.getChannelPosts = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const {channelId}=req.body;
        posts=await database.channel.findOne({_id:channelId}).select('posts').lean();
        postsContent = await database.post.find({_id: {$in:posts.posts}})
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