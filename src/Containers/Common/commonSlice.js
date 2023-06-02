import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: {
    isLoggedIn: false,
  },
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {},
});

export default commonSlice.reducer;
