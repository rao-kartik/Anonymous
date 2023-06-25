import { REDUCERS } from './constants';
import { commonReducer } from './slices';

export const reducer = {
  [REDUCERS?.common]: commonReducer,
};
