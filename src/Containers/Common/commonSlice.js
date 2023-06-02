import { createSlice } from '@reduxjs/toolkit';
import { authenticateUserThunk } from './asyncThunks';
import {
  deleteCookie,
  deleteItemLS,
  getItemLS,
  readCookie,
  setCookie,
  setItemLS,
} from '../../utils/storage';
import { REDUCERS } from '../../constants';

const initialState = {
  loader: {
    auth: false,
  },
  error: {
    auth: false,
  },
  userInfo: getItemLS('user'),
};

const commonSlice = createSlice({
  name: REDUCERS.common,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUserThunk.pending, (state) => {
        state.loader.auth = true;
        state.error.auth = false;
        state.userInfo = null;

        deleteCookie('token');
        deleteItemLS('user');
      })
      .addCase(authenticateUserThunk.fulfilled, (state, action) => {
        const userInfo = { ...action?.payload?.userDetails, isLoggedIn: true };

        state.loader.auth = false;
        state.error.auth = false;
        state.userInfo = userInfo;

        setCookie('token', action?.payload?.token);
        setItemLS('user', userInfo);
      })
      .addCase(authenticateUserThunk.rejected, (state, action) => {
        state.loader.auth = false;
        state.error.auth = true;
        state.error.authMessage = action?.error?.message;
        state.userInfo = null;

        deleteCookie('token');
        deleteItemLS('user');
      });
  },
});

export default commonSlice.reducer;
