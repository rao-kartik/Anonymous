import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './Containers/Home/Home';
import InitialPage from './Containers/InitialPage/InitialPage';
import Fundraisers from './Containers/Fundraisers/Fundraisers';

import { PATHS, REDUCERS } from './constants';
import { deleteItemLS } from './utils/storage';
import { getPushUserThunk } from './Containers/Chat/chatAsynkThunks';
import { getUserInfoThunk } from './Containers/Common/asyncThunks';

const App = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((reducer) => reducer[REDUCERS.common]);
  const { pushUser, key } = useSelector((state) => state[REDUCERS.chat]);

  const userInfoFetched = useRef(false);
  const fetched = useRef(false);

  const router = createBrowserRouter([
    {
      path: PATHS.main,
      element: <InitialPage />,
      exact: true,
    },
    {
      path: PATHS.home,
      element: userInfo?.isLoggedIn ? <Home /> : <Navigate to={PATHS.main} />,
      exact: true,
    },
    {
      path: PATHS.fundraiser,
      element: userInfo?.isLoggedIn ? <Fundraisers /> : <Navigate to={PATHS.main} />,
      exact: true,
    },
  ]);

  const checkIfMetamaskConnected = async () => {
    if (typeof window !== 'undefined') {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });

      if (!accounts?.length > 0) {
        deleteItemLS('token');
      } else if (!userInfo && !userInfoFetched?.current) {
        dispatch(getUserInfoThunk());
        userInfoFetched.current = true;
      }
    }
  };

  useEffect(() => {
    checkIfMetamaskConnected();
  }, []);

  useEffect(() => {
    if (!fetched.current && userInfo?.isLoggedIn && !pushUser && !key) {
      dispatch(getPushUserThunk());
      fetched.current = true;
    }
  }, [userInfo]);

  return <RouterProvider router={router} />;
};

export default App;
