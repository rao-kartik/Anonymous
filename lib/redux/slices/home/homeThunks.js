import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  deletePostApi,
  editPostApi,
  getAllCommentsApi,
  getAllPostApi,
  getAllPostUserApi,
  likeDislikeApi,
  newCommentApi,
  newPostApi,
} from './api';
import { errorAlert } from '@/utils/common';

export const getAllPostsThunk = createAsyncThunk('post/get/all', async (payload) => {
  try {
    const response = await getAllPostApi(payload);

    return response.data;
  } catch (err) {
    errorAlert(err, true);
    throw err?.response?.data || err;
  }
});

export const getAllPostsUserThunk = createAsyncThunk('post/get/user', async (payload) => {
  try {
    const response = await getAllPostUserApi(payload);

    return response.data;
  } catch (err) {
    errorAlert(err, true);
    throw err?.response?.data || err;
  }
});

export const newPostThunk = createAsyncThunk('post/new', async (payload) => {
  try {
    const response = await newPostApi(payload);

    return response.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
});

export const editPostThunk = createAsyncThunk('post/edit', async (payload) => {
  try {
    const response = await editPostApi(payload);

    return response.data;
  } catch (err) {
    errorAlert(err, true);
    throw err?.response?.data || err;
  }
});

export const deletePostThunk = createAsyncThunk('post/delete', async (payload) => {
  try {
    const response = await deletePostApi(payload);

    return { ...response.data, postId: payload };
  } catch (err) {
    errorAlert(err, true);
    throw err?.response?.data || err;
  }
});

export const likeDislikeThunk = createAsyncThunk('post/likeDislike', async (payload) => {
  try {
    const response = await likeDislikeApi(payload);

    return { ...response.data, ...payload };
  } catch (err) {
    errorAlert(err, true);
    throw err?.response?.data || err;
  }
});

export const getAllCommentsThunk = createAsyncThunk('comment/get/all', async (payload) => {
  try {
    const response = await getAllCommentsApi(payload);

    return response.data;
  } catch (err) {
    errorAlert(err, true);
    throw err?.response?.data || err;
  }
});

export const newCommentThunk = createAsyncThunk('comment/new', async (payload) => {
  try {
    const response = await newCommentApi(payload);

    return response.data;
  } catch (err) {
    errorAlert(err, true);
    throw err?.response?.data || err;
  }
});
