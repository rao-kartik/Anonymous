import { createAsyncThunk } from '@reduxjs/toolkit';
import { connectToContract } from './util';

export const fetchContractDetailsThunk = createAsyncThunk('fundraiser/fetchContractDetails', () => {
  try {
    const response = connectToContract();

    return response;
  } catch (err) {
    throw err?.response?.data || err;
  }
});

// export cont fetchAllActiveFundraisers = 