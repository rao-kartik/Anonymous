import React, { useEffect, useRef } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { deleteItemLS } from './utils/storage';
import { checkAccountConnectivity } from './utils/ether';
import { PATHS, REDUCERS } from './constants';
import { getUserInfoThunk } from './Containers/Common/asyncThunks';
import InitialPage from './Containers/InitialPage/InitialPage';
import CommonToast from './HOC/CommonToast/CommonToast';

function App() {
  const { userInfo } = useSelector((reducer) => reducer[REDUCERS.common]);
  const dispatch = useDispatch();
  const pathname = window.location.pathname;

  const userInfoFetched = useRef(false);

  const router = createBrowserRouter([
    {
      path: PATHS.main,
      element: <InitialPage />,
      exact: true,
    },
    // {
    //   path: PATHS.home,
    //   element: userInfo?.isLoggedIn ? <Home /> : <></>,
    //   exact: true,
    // },
    // {
    //   path: PATHS.fundraiser,
    //   element: userInfo?.isLoggedIn ? <Fundraisers /> : <></>,
    //   exact: true,
    // },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <RouterProvider router={router} />;
}

const withToast = CommonToast();

export default withToast(App);
