import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { PATHS, REDUCERS } from './constants';

import SignIn from './Containers/Auth/SignIn';
import Home from './Containers/Home/Home';
import { getPushUserThunk } from './Containers/Chat/chatAsynkThunks';

const App = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((reducer) => reducer[REDUCERS.common]);
  const { pushUser, key } = useSelector((state) => state[REDUCERS.chat]);

  const router = createBrowserRouter([
    {
      path: PATHS.home,
      element: userInfo?.isLoggedIn ? <Home /> : <Navigate to={PATHS.signin} />,
      exact: true,
    },
    {
      path: PATHS.signin,
      element: <SignIn />,
      exact: true,
    },
  ]);

  useEffect(() => {
    if (userInfo?.isLoggedIn && !pushUser && !key) {
      dispatch(getPushUserThunk());
    }
  }, [userInfo]);

  return <RouterProvider router={router} />;
};

export default App;
