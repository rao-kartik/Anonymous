import { REDUCERS } from './constants';
import { commonReducer, homeReducer } from './slices';

export const reducer = {
  [REDUCERS?.common]: commonReducer,
  [REDUCERS?.home]: homeReducer,
};
