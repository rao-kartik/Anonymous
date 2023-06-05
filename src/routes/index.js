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

router.get('/ping', (_, res) => {
  res.send('The app is working');
});

router.get('/authenticate/:address', validateAddress, authenticateUser);

router.post('/post/new', validateToken, newPost);
router.patch('/post/edit/:postId', validateToken, isPostOwner, editPost);
router.delete('/post/delete/:postId', validateToken, isPostOwner, deletePost);
router.get('/post/all', validateToken, allPosts);
router.get('/post/user', validateToken, allPostsOfUser);
router.get('/post/get-all/likes/:postId', validateToken, getAllLikes);
router.post('/post/like/:postId', validateToken, likePost);
router.delete('/post/dislike/:likeId', validateToken, dislikePost);

module.exports = router;
