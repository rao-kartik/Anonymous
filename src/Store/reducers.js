import { combineReducers } from 'redux';

import { REDUCERS } from '../constants';

import commonReducer from '../Containers/Common/commonSlice';
import homeReducer from '../Containers/Home/homeSlice';
import chatReducer from '../Containers/Chat/chatSlice';

const reducers = combineReducers({
  [REDUCERS.common]: commonReducer,
  [REDUCERS.home]: homeReducer,
  [REDUCERS.chat]: chatReducer,
});

export default reducers;
