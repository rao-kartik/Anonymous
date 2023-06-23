const POST = require('../models/post.model');

const isPostOwner = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const post = await POST.findById(postId).lean().exec();

    if (!post) {
      return res.status(400).send({
        success: false,
        message: 'Post not found',
      });
    }

    if (post?.postedBy?.toString() !== req.userId) {
      return res.status(401).send({
        success: false,
        message: 'Unauthorised User',
      });
    }

    next();
  } catch (err) {
    return res.status(400).semd({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  isPostOwner,
};
