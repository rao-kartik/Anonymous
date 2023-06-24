import { createAsyncThunk } from '@reduxjs/toolkit';
import { connectToContract } from '../../utils/ether';

export const startFundRaiserThunk = createAsyncThunk(
  'fundraiser/startNewFundraiser',
  async (payload) => {
    try {
      const contract = await connectToContract();
      console.log(contract);

      const tx = await contract.startFundRaiser(
        payload?.raisedFor,
        payload?.amount,
        payload?.toBeRaisedInDays,
        payload?.about,
        payload?.category
      );
      await tx.wait();

      console.log(tx);
      return tx;
    } catch (err) {
      throw err?.response?.data || err;
    }
  }
);
