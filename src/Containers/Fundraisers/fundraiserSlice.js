import { createSlice } from '@reduxjs/toolkit';
import { REDUCERS } from '../../constants';

const initialState = {
  loader: {},
  error: {},
  messages: {},
  allFundraisers: {},
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
    setAllFundraiser: (state, action) => {
      state.allFundraisers = { ...action.payload, ...state?.allFundraisers };
    },
  },
});

export const { setFundraiserReducer, setAllFundraiser } = fundraiser.actions;

export default fundraiser.reducer;
