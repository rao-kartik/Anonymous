import { createSlice } from '@reduxjs/toolkit';
import { authenticateUserThunk } from './asyncThunks';
import { deleteItemLS, getItemLS, setItemLS } from '../../utils/storage';
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
        deleteItemLS('user');
      })
      .addCase(authenticateUserThunk.fulfilled, (state, action) => {
        const userInfo = { ...action?.payload?.userDetails, isLoggedIn: true };

        state.loader.auth = false;
        state.error.auth = false;
        state.userInfo = userInfo;

        setItemLS('token', action?.payload?.token);
        setItemLS('user', userInfo);
      })
      .addCase(authenticateUserThunk.rejected, (state, action) => {
        state.loader.auth = false;
        state.error.auth = true;
        state.error.authMessage = action?.error?.message;
        state.userInfo = null;

        deleteItemLS('token');
        deleteItemLS('user');
      });
  },
});

export const { setCommonReducer } = commonSlice.actions;

export default commonSlice.reducer;
