import { createAsyncThunk } from '@reduxjs/toolkit';
import { authenticateUserApi } from '../Auth/api';

export const authenticateUserThunk = createAsyncThunk('user/authenticate', async (payload) => {
  try {
    const response = await authenticateUserApi(payload);

    return response.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
});
