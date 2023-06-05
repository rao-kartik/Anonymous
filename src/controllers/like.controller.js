const LIKE = require('../models/likes.model');
const POST = require('../models/post.model');

const getAllLikes = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await POST.findById(postId).lean().exec();

    if (!post) {
      res.status(400).send({
        success: true,
        message: 'Post not found',
      });
    }

    const likes = await LIKE.find({ post: postId }).lean().exec();

    return res.send({
      success: true,
      likes,
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

const likePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const like = await LIKE.findOne({ post: postId, likedBy: req.userId }).lean().exec();

    if (like) {
      return res.status(409).send({
        success: false,
        messge: 'Already Liked',
      });
    }

    const post = await POST.findById(postId).lean().exec();

    if (!post) {
      res.status(400).send({
        success: true,
        message: 'Post not found',
      });
    }

    await LIKE.create({ likedBy: req.userId, post: postId });
    await POST.findByIdAndUpdate(postId, { totalLikes: post?.totalLikes + 1 });

    return res.send({
      success: true,
      message: 'Liked Successfully',
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

const dislikePost = async (req, res) => {
  try {
    const { likeId } = req.params;

    let like = await LIKE.findById(likeId).lean().exec();

    if (!like) {
      return res.status(400).send({
        success: false,
        message: 'Already Disliked',
      });
    }

    if (like?.likedBy?.toString() !== req.userId) {
      res.status(400).send({
        success: true,
        message: 'Unauthorised User',
      });
    }

    like = await LIKE.findByIdAndDelete(likeId);
    const post = await POST.findById(like?.post).lean().exec();
    await POST.findByIdAndUpdate(post?._id, { totalLikes: post?.totalLikes - 1 });

    return res.send({
      success: true,
      message: 'DisLiked Successfully',
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getAllLikes,
  likePost,
  dislikePost,
};
