import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { PATHS, REDUCERS } from './constants';

import Home from './Containers/Home/Home';
import { getPushUserThunk } from './Containers/Chat/chatAsynkThunks';
import InitialPage from './Containers/InitialPage/InitialPage';
import Fundraisers from './Containers/Fundraisers/Fundraisers';
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
      element: userInfo?.isLoggedIn ? <Navigate to={PATHS.home} /> : <InitialPage />,
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

  useEffect(() => {
    if (!userInfo && !userInfoFetched?.current) {
      dispatch(getUserInfoThunk());
      userInfoFetched.current = true;
    }
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
