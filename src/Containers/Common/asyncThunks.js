import { createAsyncThunk } from '@reduxjs/toolkit';
import { authenticateUserApi, followUnfollowApi, getUserInfoApi } from '../Auth/api';
import { errorAlert, triggerAlert } from '../../utils/common';

export const authenticateUserThunk = createAsyncThunk('user/authenticate', async (payload) => {
  try {
    const response = await authenticateUserApi(payload);

    triggerAlert('success', 'Signin Successful');

    return response.data;
  } catch (err) {
    errorAlert(err);
    throw err?.response?.data || err;
  }
});

export const getUserInfoThunk = createAsyncThunk('user/get-info', async () => {
  try {
    const response = await getUserInfoApi();

    return response.data;
  } catch (err) {
    if (typeof window !== 'undefined' && window?.location?.pathname !== '/') errorAlert(err, true);
    throw err?.response?.data || err;
  }
});

export const followUnfollowThunk = createAsyncThunk('user/follow-unfollow', async (payload) => {
  try {
    const response = await followUnfollowApi(payload);

    triggerAlert('success', response?.data?.message);

    return response.data;
  } catch (err) {
    errorAlert(err, true);
    throw err?.response?.data || err;
  }
});
