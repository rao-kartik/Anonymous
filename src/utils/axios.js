import Axios from 'axios';
import { deleteItemLS, getItemLS } from './storage';

const axios = Axios.create();

axios.interceptors.request.use(
  function (config) {
    const token = getItemLS('token');

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
    if (err.response.data.message === 'jwt expired') {
      deleteItemLS('token');
      deleteItemLS('user');
      window.location.href = '/auth/signin';
    }
    return Promise.reject(err);
  }
);

export default axios;
