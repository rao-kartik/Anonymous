const express = require('express');
const router = express.Router();

const {
  authenticateUser,
  followUser,
  unfollowUser,
  getUserDetails,
} = require('../controllers/user.controller');
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
const {
  createGroup,
  getAllGroups,
  getAllGroupsOfUser,
  editGroup,
  addMember,
  removeMembers,
  joinGroup,
  leaveGroup,
  deleteGroup,
} = require('../controllers/group.controller');

router.get('/ping', (_, res) => {
  res.send('The app is working');
});

router.get('/authenticate/:address', validateAddress, authenticateUser);
router.get('/user/get-info', validateToken, getUserDetails);
router.post('/user/follow', validateToken, followUser);
router.post('/user/unfollow', validateToken, unfollowUser);

router.post('/post/new', validateToken, newPost);
router.patch('/post/edit/:postId', validateToken, isPostOwner, editPost);
router.delete('/post/delete/:postId', validateToken, isPostOwner, deletePost);
router.get('/post/all', validateToken, allPosts);
router.get('/post/all/user', validateToken, allPostsOfUser);
router.get('/post/like/all/:postId', validateToken, getAllLikes);
router.post('/post/like/:postId', validateToken, likePost);
router.post('/post/dislike/:postId', validateToken, dislikePost);
router.post('/post/comment/new/:postId', validateToken, newComment);
router.get('/post/comment/all/:postId', validateToken, getAllComments);
router.patch('/post/comment/edit/:commentId', validateToken, editComment);
router.delete('/post/comment/delete/:commentId', validateToken, deleteComment);

router.get('/group/all', validateToken, getAllGroups);
router.get('/group/all/user', validateToken, getAllGroupsOfUser);
router.post('/group/new', validateToken, createGroup);
router.post('/group/edit/:groupId', validateToken, editGroup);
router.post('/group/add/member/:groupId', validateToken, addMember);
router.post('/group/remove/member/:groupId', validateToken, removeMembers);
router.post('/group/join/:groupId', validateToken, joinGroup);
router.post('/group/leave/:groupId', validateToken, leaveGroup);
router.post('/group/delete/:groupId', validateToken, deleteGroup);

module.exports = router;
