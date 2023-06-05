const express = require('express');
const router = express.Router();

const { authenticateUser } = require('../controllers/user.controller');
const { validateAddress, validateToken } = require('../middlewares/auth.middleware');
const {
  newPost,
  editPost,
  allPosts,
  allPostsOfUser,
  deletePost,
} = require('../controllers/post.controller');
const { isPostOwner } = require('../middlewares/post.middleware');
const { likePost, dislikePost, getAllLikes } = require('../controllers/like.controller');
const {
  newComment,
  getAllComments,
  editComment,
  deleteComment,
} = require('../controllers/comment.controller');

router.get('/ping', (_, res) => {
  res.send('The app is working');
});

router.get('/authenticate/:address', validateAddress, authenticateUser);

router.post('/post/new', validateToken, newPost);
router.patch('/post/edit/:postId', validateToken, isPostOwner, editPost);
router.delete('/post/delete/:postId', validateToken, isPostOwner, deletePost);
router.get('/post/all', validateToken, allPosts);
router.get('/post/user', validateToken, allPostsOfUser);
router.get('/post/like/all/:postId', validateToken, getAllLikes);
router.post('/post/like/:postId', validateToken, likePost);
router.delete('/post/dislike/:likeId', validateToken, dislikePost);
router.post('/post/comment/new/:postId', validateToken, newComment);
router.get('/post/comment/all/:postId', validateToken, getAllComments);
router.patch('/post/comment/edit/:commentId', validateToken, editComment);
router.delete('/post/comment/delete/:commentId', validateToken, deleteComment);

module.exports = router;
