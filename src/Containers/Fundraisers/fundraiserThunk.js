import { createAsyncThunk } from '@reduxjs/toolkit';
import { connectToContract } from './util';
import { REDUCERS } from '../../constants';

export const fetchContractDetailsThunk = createAsyncThunk('fundraiser/fetchContractDetails', () => {
  try {
    const response = connectToContract();

    return response;
  } catch (err) {
    throw err?.response?.data || err;
  }
});

export const startFundRaiserThunk = createAsyncThunk(
  'fundraiser/startNewFundraiser',
  async (payload) => {
    try {
      const { contractDetails, data } = payload;
      console.log(contractDetails.startFundRaiser);

      const tx = await contractDetails.startFundRaiser(
        data?.raisedFor,
        data?.amount,
        data?.toBeRaisedInDays,
        data?.about,
        data?.category
      );
      await tx.wait();

      console.log(tx);
      return tx;
    } catch (err) {
      throw err?.response?.data || err;
    }
  }
);
