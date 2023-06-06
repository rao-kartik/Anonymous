const POST = require('../models/post.model');
const LIKE = require('../models/likes.model');
const COMMENT = require('../models/comment.model');

const allPosts = async (req, res) => {
  try {
    const posts = await POST.find({ group: null }).populate('postedBy').lean().exec();

    const formattedPosts = [];

    for (let i = 0; i < posts.length; i++) {
      const userLiked = await LIKE.findOne({ likedBy: req.userId, post: posts[i]?._id })
        .lean()
        .exec();

      formattedPosts[i] = {
        ...posts[i],
        postedBy: {
          userName: posts[i]?.postedBy?.userName,
          walletAddress: posts[i]?.postedBy?.walletAddress,
        },
        userLiked:
          userLiked && posts[i]?._id?.toString() === userLiked?.post?.toString() ? true : false,
      };
    }

    return res.send({
      success: true,
      posts: formattedPosts,
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

const allPostsOfUser = async (req, res) => {
  try {
    let posts = await POST.find({ postedBy: req.userId }).lean().exec();

    const formattedPosts = [];

    for (let i = 0; i < posts.length; i++) {
      const userLiked = await LIKE.findOne({ likedBy: req.userId, post: posts[i]?._id })
        .lean()
        .exec();

      formattedPosts[i] = {
        ...posts[i],
        postedBy: {
          userName: posts[i]?.postedBy?.userName,
          walletAddress: posts[i]?.postedBy?.walletAddress,
        },
        userLiked:
          userLiked && posts[i]?._id?.toString() === userLiked?.post?.toString() ? true : false,
      };
    }

    return res.send({
      success: true,
      posts: formattedPosts,
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

const newPost = async (req, res) => {
  try {
    if (!req.body.post || req.body.post === '') {
      return res.status(400).send({
        success: false,
        message: 'Invalid post',
      });
    }

    const data = {
      post: req.body.post,
      group: req.body.group || null,
      postedBy: req?.userId,
    };

    const post = await POST.create(data);

    return res.status(200).send({
      success: true,
      post,
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

const editPost = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId && (!req.body.post || req.body.post === '')) {
      return res.status(400).send({
        success: false,
        message: 'Invalid post',
      });
    }

    const oldPost = await POST.findByIdAndUpdate(postId, { post: req?.body?.post });
    const newPost = await POST.findById(postId).lean().exec();

    return res.status(200).send({
      success: true,
      oldPost: oldPost?.post,
      newPost: newPost?.post,
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).send({
        success: false,
        message: 'Invalid post',
      });
    }

    await POST.findByIdAndRemove(postId);
    await LIKE.deleteMany({ post: postId });
    await COMMENT.deleteMany({ post: postId });

    return res.status(200).send({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { allPosts, newPost, editPost, allPostsOfUser, deletePost };
