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
import { checkAccountConnectivity } from './utils/ether';
import CommonToast from './HOC/CommonToast/CommonToast';

const App = () => {
  const dispatch = useDispatch();
  const pathname = window?.location?.pathname;

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
      element: userInfo?.isLoggedIn ? <Home /> : <></>,
      exact: true,
    },
    {
      path: PATHS.fundraiser,
      element: userInfo?.isLoggedIn ? <Fundraisers /> : <></>,
      exact: true,
    },
  ]);

  const checkIfMetamaskConnected = async () => {
    if (typeof window !== 'undefined') {
      const isConnected = await checkAccountConnectivity();

      if (!isConnected && pathname !== PATHS?.main) {
        deleteItemLS('token');
        window.location.href = PATHS.main;
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

const withToast = CommonToast();

export default withToast(App);
