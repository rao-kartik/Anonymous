import { createAsyncThunk } from '@reduxjs/toolkit';
import { authenticateUserApi, getUserInfoApi } from '../Auth/api';

export const authenticateUserThunk = createAsyncThunk('user/authenticate', async (payload) => {
  try {
    const response = await authenticateUserApi(payload);

    return response.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
});

export const getUserInfoThunk = createAsyncThunk('user/get-info', async () => {
  try {
    const response = await getUserInfoApi();

    return response.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
});
