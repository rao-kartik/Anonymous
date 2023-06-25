const { configureStore } = require('@reduxjs/toolkit');

import { reduxMiddleware } from './redux.middleware';
import { reducer } from './rootReducer';

const configreStoreDefaultOptions = { reducer };

export const makeReduxStore = (options = configreStoreDefaultOptions) => {
  const store = configureStore(options);

  return store;
};

export const reduxStore = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    console.log(getDefaultMiddleware().concat(reduxMiddleware))
    return getDefaultMiddleware().concat(reduxMiddleware);
  },
});
