import { createSlice } from '@reduxjs/toolkit';
import { authenticateUserThunk, followUnfollowThunk, getUserInfoThunk } from './asyncThunks';
import { deleteItemLS, setItemLS } from '../../utils/storage';
import { REDUCERS } from '../../constants';

const initialState = {
  loader: {
    auth: false,
  },
  error: {
    auth: false,
  },
  userInfo: null,
  messages: {},
};

const commonSlice = createSlice({
  name: REDUCERS.common,
  initialState,
  reducers: {
    setCommonReducer: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUserThunk.pending, (state) => {
        state.loader.auth = true;
        state.error.auth = false;
        state.userInfo = null;
        state.authOrigin = 'auth';

        deleteItemLS('token');
      })
      .addCase(authenticateUserThunk.fulfilled, (state, action) => {
        const userInfo = { ...action?.payload?.userDetails, isLoggedIn: true };

        state.loader.auth = false;
        state.error.auth = false;
        state.userInfo = userInfo;

        setItemLS('token', action?.payload?.token);
      })
      .addCase(authenticateUserThunk.rejected, (state, action) => {
        state.loader.auth = false;
        state.error.auth = true;
        state.error.authMessage = action?.error?.message;
        state.userInfo = null;

        deleteItemLS('token');
      })
      /* GET USER INFO */
      .addCase(getUserInfoThunk.pending, (state) => {
        state.loader.info = true;
        state.error.info = false;
        state.userInfo = null;
        state.authOrigin = 'info';
      })
      .addCase(getUserInfoThunk.fulfilled, (state, action) => {
        const userInfo = { ...action?.payload?.userDetails, isLoggedIn: true };

        state.loader.info = false;
        state.error.info = false;
        state.userInfo = userInfo;
        state.origin = 'auth';
      })
      .addCase(getUserInfoThunk.rejected, (state, action) => {
        state.loader.info = false;
        state.error.info = true;
        state.messages.info = action?.error?.message;
        state.userInfo = null;
      })
      /* FOLLOW UNFOLLOW USER */
      .addCase(followUnfollowThunk.pending, (state) => {
        state.loader.followUnfollow = true;
        state.error.followUnfollow = false;
      })
      .addCase(followUnfollowThunk.fulfilled, (state, action) => {
        state.loader.followUnfollow = false;
        state.error.followUnfollow = false;
        state.userInfo = { ...state.userInfo, ...action?.payload?.userDetails };
        state.messages.followUnfollow = action?.payload?.message;
      })
      .addCase(followUnfollowThunk.rejected, (state, action) => {
        state.loader.followUnfollow = false;
        state.error.followUnfollow = true;
        state.messages.followUnfollow = action?.error?.message;
      });
  },
});

export const { setCommonReducer } = commonSlice.actions;

export default commonSlice.reducer;
