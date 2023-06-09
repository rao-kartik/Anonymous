import { createAsyncThunk } from '@reduxjs/toolkit';
import * as PushAPI from '@pushprotocol/restapi';

import { getEtherSigner } from '../../utils/ether';

const ENV = 'staging';

export const decryptDPGKeyThunk = createAsyncThunk('DECRYPT_DPG_KEY', async (payload) => {
  try {
    const { signer, address } = await getEtherSigner();

    const decryptedKey = await PushAPI.chat.decryptPGPKey({
      encryptedPGPPrivateKey: payload?.encryptedPrivateKey,
      address: address,
      signer: signer,
      env: ENV,
      toUpgrade: true,
    });

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

    if (_user) {
      others.dispatch(decryptDPGKeyThunk(_user));
    }

    return _user;
  } catch (err) {
    throw err?.response?.data || err;
  }
});

export const sendMessage = createAsyncThunk('SEND_MESSAGE', async (payload) => {
  try {
    const { account } = await getEtherSigner();

    const _user = await PushAPI.user.get({
      account: 'eip155:' + account,
      env: 'staging',
    });

    console.log(_user);
    return _user;
  } catch (err) {
    throw err?.response?.data || err;
  }
});
