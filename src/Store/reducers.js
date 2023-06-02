import { combineReducers } from 'redux';
import commonReducer from '../Containers/Common/commonSlice';

const reducers = combineReducers({
  common: commonReducer,
});

export default reducers;
