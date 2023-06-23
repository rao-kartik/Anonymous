import Axios from 'axios';
import customAxios, { apiBaseUrl } from '../../utils/axios';

const axios = Axios.create({ baseURL: apiBaseUrl });

const ENDPOINTS = {
  authenticate: '/api/v1/authenticate',
  getUserInfo: 'user/get-info',
  follow: 'user/follow',
  unfollow: 'user/unfollow',
};

export const authenticateUserApi = async (address) => {
  try {
    const response = await axios.get(`${ENDPOINTS.authenticate}/${address}`);

    return response;
  } catch (err) {
    throw err;
  }
};

export const getUserInfoApi = async () => {
  try {
    const response = await customAxios.get(`${ENDPOINTS.getUserInfo}/`);

    return response;
  } catch (err) {
    throw err;
  }
};

export const followUnfollowApi = async ({ type, id }) => {
  try {
    let reqUrl = type === 'follow' ? ENDPOINTS?.follow : ENDPOINTS?.unfollow;
    const response = await customAxios.post(`${reqUrl}?id=${id}`);

    return response;
  } catch (err) {
    throw err;
  }
};
