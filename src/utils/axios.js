import Axios from 'axios';
import { getItemLS } from './storage';

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

export default axios;
