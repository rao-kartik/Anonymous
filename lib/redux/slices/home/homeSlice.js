import { createSlice } from '@reduxjs/toolkit';
import {
  deletePostThunk,
  editPostThunk,
  getAllCommentsThunk,
  getAllPostsThunk,
  getAllPostsUserThunk,
  likeDislikeThunk,
  newCommentThunk,
  newPostThunk,
} from './homeThunks';
import { REDUCERS } from '../../constants';

const initialState = {
  loader: {},
  error: {},
  posts: null,
};

const homeSlice = createSlice({
  name: REDUCERS.home,
  initialState,
  reducers: {
    setHomeReducer: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // get All Posts
      .addCase(getAllPostsThunk.pending, (state) => {
        state.loader.getPost = true;
        state.error.getPost = false;
      })
      .addCase(getAllPostsThunk.fulfilled, (state, action) => {
        state.loader.getPost = false;
        state.error.getPost = false;
        state.posts = action.payload?.posts;
      })
      .addCase(getAllPostsThunk.rejected, (state) => {
        state.loader.getPost = false;
        state.error.getPost = true;
      })
      // get all posts of user
      .addCase(getAllPostsUserThunk.pending, (state) => {
        state.loader.getPost = true;
        state.error.getPost = false;
      })
      .addCase(getAllPostsUserThunk.fulfilled, (state, action) => {
        state.loader.getPost = false;
        state.error.getPost = false;
        state.posts = action.payload?.posts;
      })
      .addCase(getAllPostsUserThunk.rejected, (state) => {
        state.loader.getPost = false;
        state.error.getPost = true;
      })
      // new Post
      .addCase(newPostThunk.pending, (state) => {
        state.loader.newPost = true;
        state.error.newPost = false;
      })
      .addCase(newPostThunk.fulfilled, (state, action) => {
        state.loader.newPost = false;
        state.error.newPost = false;
        state.posted = true;
        state.posts = [action?.payload?.post, ...(state.posts || [])];
      })
      .addCase(newPostThunk.rejected, (state) => {
        state.loader.newPost = false;
        state.error.newPost = true;
      })
      // edit post
      .addCase(editPostThunk.pending, (state) => {
        state.loader.editPost = true;
        state.error.editPost = false;
      })
      .addCase(editPostThunk.fulfilled, (state, action) => {
        state.loader.editPost = false;
        state.error.editPost = false;
        state.posts = action.payload;
      })
      .addCase(editPostThunk.rejected, (state) => {
        state.loader.editPost = false;
        state.error.editPost = true;
      })
      // delete post
      .addCase(deletePostThunk.pending, (state) => {
        state.loader.deletePost = true;
        state.error.deletePost = false;
      })
      .addCase(deletePostThunk.fulfilled, (state, action) => {
        state.loader.deletePost = false;
        state.error.deletePost = false;
        state.posts = state.posts?.filter((_post) => _post?._id !== action?.payload?.postId);
      })
      .addCase(deletePostThunk.rejected, (state) => {
        state.loader.deletePost = false;
        state.error.deletePost = true;
      })
      // like dislike
      .addCase(likeDislikeThunk.pending, (state) => {
        state.loader.likeDislike = true;
        state.error.likeDislike = false;
      })
      .addCase(likeDislikeThunk.fulfilled, (state, action) => {
        state.loader.likeDislike = false;
        state.error.likeDislike = false;
        state.posts = state.posts.map((_item) =>
          _item?._id === action.payload?.postId
            ? {
                ..._item,
                userLiked: action.payload?.status === 'like' ? true : false,
                totalLikes:
                  action.payload?.status === 'like' ? _item?.totalLikes + 1 : _item?.totalLikes - 1,
              }
            : _item
        );
      })
      .addCase(likeDislikeThunk.rejected, (state) => {
        state.loader.likeDislike = false;
        state.error.likeDislike = true;
      })
      // get all comments
      .addCase(getAllCommentsThunk.pending, (state) => {
        state.loader.getComments = true;
        state.error.getComments = false;
        state.comments = null;
      })
      .addCase(getAllCommentsThunk.fulfilled, (state, action) => {
        state.loader.getComments = false;
        state.error.getComments = false;
        state.comments = action.payload?.comments;
      })
      .addCase(getAllCommentsThunk.rejected, (state) => {
        state.loader.getComments = false;
        state.error.getComments = true;
        state.comments = null;
      })
      // new Comment
      .addCase(newCommentThunk.pending, (state) => {
        state.loader.getComments = true;
        state.error.getComments = false;
      })
      .addCase(newCommentThunk.fulfilled, (state, action) => {
        state.loader.getComments = false;
        state.error.getComments = false;
        state.comments = [action.payload?.comment, ...(state?.comments || [])];
        state.posts = state.posts.map((_item) =>
          _item?._id === action.payload?.comment?.post
            ? {
                ..._item,
                totalComments: _item?.totalComments + 1,
              }
            : _item
        );
      })
      .addCase(newCommentThunk.rejected, (state) => {
        state.loader.getComments = false;
        state.error.getComments = true;
        state.comments = null;
      });
  },
});

export const { setHomeReducer } = homeSlice.actions;

export const homeReducer = homeSlice.reducer;
