const { REDUCERS } = require('../../constants');

export const homeSelector = (state) => state?.[REDUCERS?.home];
