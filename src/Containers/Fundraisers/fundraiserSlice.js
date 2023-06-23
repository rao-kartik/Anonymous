import { createSlice } from '@reduxjs/toolkit';
import { REDUCERS } from '../../constants';
import { fetchContractDetailsThunk } from './fundraiserThunk';

const initialState = {
  loader: {},
  error: {},
  messages: {},
};

const fundraiser = createSlice({
  name: REDUCERS.common,
  initialState,
  reducers: {
    setFundraiserReducer: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      /* FETCH CONTRACT DETAILS */
      .addCase(fetchContractDetailsThunk.pending, (state) => {
        state.loader.contractDetails = true;
        state.error.contractDetails = false;
      })
      .addCase(fetchContractDetailsThunk.fulfilled, (state, action) => {
        state.loader.contractDetails = false;
        state.error.contractDetails = false;
        state.contractDetails = action.payload;
      })
      .addCase(fetchContractDetailsThunk.rejected, (state, action) => {
        state.loader.contractDetails = false;
        state.error.contractDetails = true;
        state.messages.contractDetails = action?.error?.message;
      });
  },
});

export const { setFundraiserReducer } = fundraiser.actions;

export default fundraiser.reducer;
