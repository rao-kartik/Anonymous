import axios from 'axios';

const ENDPOINTS = {
  authenticate: '/api/v1/authenticate',
};

export const authenticateUserApi = async (address) => {
  try {
    const response = await axios.get(`${ENDPOINTS.authenticate}/${address}`);

    return response;
  } catch (err) {
    throw err;
  }
};
