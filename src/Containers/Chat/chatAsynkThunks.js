import { createAsyncThunk } from '@reduxjs/toolkit';
import * as PushAPI from '@pushprotocol/restapi';

import { getEtherSigner } from '../../utils/ether';
import { REDUCERS } from '../../constants';
import { addressPrefix } from '../../utils/common';

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
      account: addressPrefix + account,
      env: ENV,
    });

    if (_user) others.dispatch(decryptDPGKeyThunk(_user));

    return _user;
  } catch (err) {
    throw err?.response?.data || err;
  }
});

export const approveChatRequestThunk = createAsyncThunk(
  'APPROVE_CHAT_REQUEST',
  async (payload, others) => {
    try {
      const { signer, account } = await getEtherSigner();
      const { key } = others.getState()[REDUCERS.chat];

      const _user = await PushAPI.chat.approve({
        signer,
        env: ENV,
        pgpPrivateKey: key,
        messageType: 'Text',
        senderAddress: payload,
        account,
      });

      return _user;
    } catch (err) {
      throw err?.response?.data || err;
    }
  }
);

export const sendMessageThunk = createAsyncThunk('SEND_MESSAGE', async (payload, others) => {
  try {
    const { signer } = await getEtherSigner();
    const { key } = others.getState()[REDUCERS.chat];

    const _user = await PushAPI.chat.send({
      signer,
      env: ENV,
      pgpPrivateKey: key,
      messageType: 'Text',
      ...payload,
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
      const { pushUser, key } = others.getState()[REDUCERS.chat];

      let conversationHash = payload?.conversationHash;

      if (!conversationHash?.threadHash) {
        conversationHash = await PushAPI.chat.conversationHash({
          account: pushUser?.did,
          conversationId: addressPrefix + payload?.walletAddress,
          env: ENV,
        });

        if (!conversationHash.threadHash) throw new Error('Conversation not found');
      }

      const conversationList = await PushAPI.chat.history({
        threadhash: conversationHash.threadHash,
        account: pushUser?.wallets,
        toDecrypt: true,
        pgpPrivateKey: key,
        env: ENV,
      });

      return conversationList;
    } catch (err) {
      throw err?.response?.data || err;
    }
  }
);
