import { createSlice } from '@reduxjs/toolkit';

import { REDUCERS } from '../../constants';
import {
  decryptDPGKeyThunk,
  decryptMessageThunk,
  fetchAllChatRequestsThunk,
  fetchAllChatsThunk,
  fetchConversationListThunk,
  fetchLatestConversationListThunk,
  getPushUserThunk,
} from './chatAsynkThunks';

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
    setConversationList: (state, action) => {
      state.conversationList = [action.payload, ...state.conversationList];
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
      })
      //fetch all chats
      .addCase(fetchAllChatsThunk.pending, (state) => {
        state.chatsList = null;
      })
      .addCase(fetchAllChatsThunk.fulfilled, (state, action) => {
        state.chatsList = action.payload;
      })
      .addCase(fetchAllChatsThunk.rejected, (state) => {
        state.chatsList = null;
      })
      //fetch all chat requests
      .addCase(fetchAllChatRequestsThunk.pending, (state) => {
        state.chatRequests = null;
      })
      .addCase(fetchAllChatRequestsThunk.fulfilled, (state, action) => {
        state.chatRequests = action.payload;
      })
      .addCase(fetchAllChatRequestsThunk.rejected, (state) => {
        state.chatRequests = null;
      })
      //fetch conversation list
      .addCase(fetchConversationListThunk.pending, (state) => {
        state.loader.conversationList = true;
        state.conversationList = null;
      })
      .addCase(fetchConversationListThunk.fulfilled, (state, action) => {
        state.loader.conversationList = false;
        state.conversationList = action.payload;
      })
      .addCase(fetchConversationListThunk.rejected, (state) => {
        state.conversationList = null;
        state.loader.conversationList = false;
      })
      //fetch conversation list
      .addCase(fetchLatestConversationListThunk.pending, (state) => {
        state.loader.conversationList = true;
      })
      .addCase(fetchLatestConversationListThunk.fulfilled, (state, action) => {
        state.loader.conversationList = false;
        state.conversationList = [...action.payload, ...state.conversationList];
      })
      .addCase(fetchLatestConversationListThunk.rejected, (state) => {
        state.loader.conversationList = false;
      })
      // decrypt message
      .addCase(decryptMessageThunk.pending, (state) => {
        state.loader.conversationList = true;
      })
      .addCase(decryptMessageThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loader.conversationList = false;
        state.conversationList = [action.payload, ...state.conversationList];
      })
      .addCase(decryptMessageThunk.rejected, (state) => {
        state.loader.conversationList = false;
      });
  },
});

export const { setChatReduce, setConversationList } = chatSlice.actions;

export default chatSlice.reducer;