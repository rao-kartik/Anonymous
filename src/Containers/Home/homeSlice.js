import { createSlice } from '@reduxjs/toolkit';
import {
  deletePostThunk,
  editPostThunk,
  getAllPostsThunk,
  getAllPostsUserThunk,
  newPostThunk,
} from './asyncThunks';
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
        state.posts = action.payload;
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
        state.posts = action.payload;
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
        state.posts = action.payload;
      })
      .addCase(deletePostThunk.rejected, (state) => {
        state.loader.deletePost = false;
        state.error.deletePost = true;
      });
  },
});

export const { setHomeReducer } = homeSlice.actions;

export default homeSlice.reducer;
