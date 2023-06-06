import { combineReducers } from 'redux';

import { REDUCERS } from '../constants';

import commonReducer from '../Containers/Common/commonSlice';
import homeReducer from '../Containers/Home/homeSlice';

const reducers = combineReducers({
  [REDUCERS.common]: commonReducer,
  [REDUCERS.home]: homeReducer,
});

export default reducers;
