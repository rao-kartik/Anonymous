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

router.get('/ping', (_, res) => {
  res.send('The app is working');
});

router.get('/authenticate/:address', validateAddress, authenticateUser);

router.post('/post/new', validateToken, newPost);
router.patch('/post/edit/:postId', validateToken, isPostOwner, editPost);
router.delete('/post/delete/:postId', validateToken, isPostOwner, deletePost);
router.get('/post/all', validateToken, allPosts);
router.get('/post/user', validateToken, allPostsOfUser);

module.exports = router;
