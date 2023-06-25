import Axios from 'axios';
import { deleteItemLS, getItemLS } from './storage';
import { ROUTES } from './routes';
import { checkAccountConnectivity } from './ether';
import { triggerAlert } from './common';

export const apiBaseUrl = 'https://anonymous-fiio.onrender.com';

const axios = Axios.create();

axios.interceptors.request.use(
  async function (config) {
    const token = getItemLS('token');

    const isConnected = await checkAccountConnectivity();

    if (!isConnected) {
      triggerAlert('error', 'Wallet not connected');
      window.location.href = ROUTES.main;
      return Promise.reject('Wallet not connected');
    }

    config.baseURL = apiBaseUrl;
    config.url = `/api/v1/${config.url}`;
    config.headers['Authorization'] = `Bearer ${token}`;

    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (err) {
    if (
      err.response.data.message === 'jwt expired'
      // err.response.data.message === 'jwt malformed'
    ) {
      deleteItemLS('token');
      deleteItemLS('user');
      window.location.href = ROUTES.main;
    }
    return Promise.reject(err);
  }
);

export default axios;