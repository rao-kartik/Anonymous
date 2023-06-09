import { createSlice } from '@reduxjs/toolkit';

import { REDUCERS } from '../../constants';
import { decryptDPGKeyThunk, getPushUserThunk } from './chatAsynkThunks';

const initialState = {
  loader: {},
  error: {},
  messages: [],
  pushUser: null,
};

const chatSlice = createSlice({
  name: REDUCERS.home,
  initialState,
  reducers: {
    setChatReducer: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch user
      .addCase(getPushUserThunk.pending, (state) => {
        state.loader.fetchingUser = true;
        state.error.fetchingUser = false;
        state.pushUser = null;
      })
      .addCase(getPushUserThunk.fulfilled, (state, action) => {
        state.loader.fetchingUser = false;
        state.error.fetchingUser = false;
        state.pushUser = action.payload;
      })
      .addCase(getPushUserThunk.rejected, (state) => {
        state.loader.fetchingUser = false;
        state.error.fetchingUser = true;
        state.pushUser = null;
      })
      //decrypt key
      .addCase(decryptDPGKeyThunk.pending, (state) => {
        state.key = null;
      })
      .addCase(decryptDPGKeyThunk.fulfilled, (state, action) => {
        state.key = action.payload;
      })
      .addCase(decryptDPGKeyThunk.rejected, (state) => {
        state.key = null;
      });
  },
});

export const { setChatReducer } = chatSlice.actions;

export default chatSlice.reducer;
