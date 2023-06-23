import { createSlice } from '@reduxjs/toolkit';
import { authenticateUserThunk, getUserInfoThunk } from './asyncThunks';
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
      .addCase(getUserInfoThunk.pending, (state) => {
        state.loader.info = true;
        state.error.info = false;
        state.userInfo = null;
      })
      .addCase(getUserInfoThunk.fulfilled, (state, action) => {
        const userInfo = { ...action?.payload?.userDetails, isLoggedIn: true };

        state.loader.info = false;
        state.error.info = false;
        state.userInfo = userInfo;
      })
      .addCase(getUserInfoThunk.rejected, (state, action) => {
        state.loader.info = false;
        state.error.info = true;
        state.error.infoMessage = action?.error?.message;
        state.userInfo = null;
      });
  },
});

export const { setCommonReducer } = commonSlice.actions;

export default commonSlice.reducer;
