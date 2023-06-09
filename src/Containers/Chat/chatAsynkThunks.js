import { createAsyncThunk } from '@reduxjs/toolkit';
import * as PushAPI from '@pushprotocol/restapi';

import { getEtherSigner } from '../../utils/ether';
import { REDUCERS } from '../../constants';

const ENV = 'staging';

export const fetchAllChatsThunk = createAsyncThunk('FETHC_ALL_CHATS', async (payload) => {
  try {
    const chats = await PushAPI.chat.chats({
      account: payload?.wallets,
      env: ENV,
      toDecrypt: true,
      pgpPrivateKey: payload?.key,
    });

    return chats;
  } catch (err) {
    throw err?.response?.data || err;
  }
});

export const fetchAllChatRequestsThunk = createAsyncThunk(
  'FETCH_ALL_CHAT_REQUESTS',
  async (payload) => {
    try {
      const chatRequests = await PushAPI.chat.requests({
        account: payload?.wallets,
        env: ENV,
        toDecrypt: true,
        pgpPrivateKey: payload?.key,
      });

      console.log(chatRequests);
      return chatRequests;
    } catch (err) {
      throw err?.response?.data || err;
    }
  }
);

export const decryptDPGKeyThunk = createAsyncThunk('DECRYPT_DPG_KEY', async (payload, others) => {
  try {
    const { signer } = await getEtherSigner();

    const decryptedKey = await PushAPI.chat.decryptPGPKey({
      encryptedPGPPrivateKey: payload?.encryptedPrivateKey,
      account: payload?.wallets,
      signer: signer,
      env: ENV,
      toUpgrade: true,
    });

    if (decryptedKey) {
      others.dispatch(fetchAllChatsThunk({ ...payload, key: decryptedKey }));
      others.dispatch(fetchAllChatRequestsThunk({ ...payload, key: decryptedKey }));
    }

    return decryptedKey;
  } catch (err) {
    throw err?.response?.data || err;
  }
});

export const getPushUserThunk = createAsyncThunk('GET_PUSH_USER', async (_, others) => {
  try {
    const { account } = await getEtherSigner();

    const _user = await PushAPI.user.get({
      account: 'eip155:' + account,
      env: ENV,
    });

    if (_user) others.dispatch(decryptDPGKeyThunk(_user));

    return _user;
  } catch (err) {
    throw err?.response?.data || err;
  }
});

export const sendMessageThunk = createAsyncThunk('SEND_MESSAGE', async (payload) => {
  try {
    const { account } = await getEtherSigner();

    const _user = await PushAPI.user.get({
      account: 'eip155:' + account,
      env: ENV,
    });

    return _user;
  } catch (err) {
    throw err?.response?.data || err;
  }
});

export const fetchConversationListThunk = createAsyncThunk(
  'FETCH_CONVERSATION_LIST',
  async (payload, others) => {
    try {
      const { pushUser } = others.getState()[REDUCERS.chat];

      const conversationList = await PushAPI.chat.conversationHash({
        account: pushUser?.wallets,
        conversationId: 'eip155:' + payload,
        env: ENV,
      });

      return conversationList?.threadHash;
    } catch (err) {
      throw err?.response?.data || err;
    }
  }
);
