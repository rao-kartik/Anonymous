import { combineReducers } from 'redux';
import commonReducer from '../Containers/Common/commonSlice';
import { REDUCERS } from '../constants';

const reducers = combineReducers({
  [REDUCERS.common]: commonReducer,
});

export default reducers;
