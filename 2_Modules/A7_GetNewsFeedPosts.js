const database = require('./../3_SystemKernel/Database/index')
var mongoose = require('mongoose');


exports.getNewsFeedPosts = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const {previousPostId}=req.body;
        //get all posts ids
        posts=await database.user.findOne({_id:userId}).select('newsFeedPosts');
        //fileter post ids as per request
        let postId;
        if(previousPostId){
            console.log(posts)
            index=posts.newsFeedPosts.indexOf(previousPostId);
            console.log(index);
            postId=posts.newsFeedPosts.slice(index+1,index+21);

        }else{
            postId=posts.newsFeedPosts.reverse().slice(0,20);
        }
        //get the related posts
        postsContent = await database.post.find({_id:{$in:postId}})
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