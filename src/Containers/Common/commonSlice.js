import { createSlice } from '@reduxjs/toolkit';
import { authenticateUserThunk } from './asyncThunks';
import { deleteCookie, setCookie } from '../../utils/storage';
import { REDUCERS } from '../../constants';

const initialState = {
  loader: {
    auth: false,
  },
  error: {
    auth: false,
  },
  userInfo: null,
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
      })
      .addCase(authenticateUserThunk.fulfilled, (state, action) => {
        state.loader.auth = false;
        state.error.auth = false;
        state.userInfo = { ...action?.payload?.userDetails, isLoggedIn: true };

        setCookie('token', action?.payload?.token);
      })
      .addCase(authenticateUserThunk.rejected, (state, action) => {
        state.loader.auth = false;
        state.error.auth = true;
        state.error.authMessage = action?.error?.message;
        state.userInfo = null;

        deleteCookie('token');
      });
  },
});

export default commonSlice.reducer;
