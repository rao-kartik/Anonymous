const COMMENT = require('../models/comment.model');
const POST = require('../models/post.model');

const getAllComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await POST.findById(postId).lean().exec();

    if (!post) {
      res.status(400).send({
        success: true,
        message: 'Post not found',
      });
    }

    const comments = await COMMENT.find({ post: postId }).lean().exec();

    return res.send({
      success: true,
      comments,
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

const newComment = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await POST.findById(postId).lean().exec();

    if (!post) {
      res.status(400).send({
        success: true,
        message: 'Post not found',
      });
    }

    const comment = await COMMENT.create({
      comment: req.body.comment,
      commentedBy: req.userId,
      post: postId,
    });
    await POST.findByIdAndUpdate(postId, { totalComments: post?.totalComments + 1 });

    return res.send({
      success: true,
      comment,
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    let comment = await COMMENT.findById(commentId).lean().exec();

    if (!comment) {
      return res.status(400).send({
        success: false,
        message: 'Comment Already Deleted',
      });
    }

    if (comment?.commentedBy?.toString() !== req.userId) {
      res.status(400).send({
        success: true,
        message: 'Unauthorised User',
      });
    }

    comment = await COMMENT.findByIdAndDelete(commentId);
    const post = await POST.findById(comment?.post).lean().exec();
    await POST.findByIdAndUpdate(post?._id, { totalComments: post?.totalComments - 1 });

    return res.send({
      success: true,
      comment,
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

const editComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await COMMENT.findById(commentId).lean().exec();

    if (!comment) {
      return res.status(400).send({
        success: false,
        message: 'Comment not found',
      });
    }

    const oldComment = await COMMENT.findByIdAndUpdate(commentId, { comment: req.body.comment });
    const newComment = await COMMENT.findById(commentId).lean().exec();

    return res.send({
      success: true,
      oldComment: oldComment?.comment,
      newComment: newComment?.comment,
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getAllComments,
  newComment,
  editComment,
  deleteComment,
};
