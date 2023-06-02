import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { PATHS, REDUCERS } from './constants';

import SignIn from './Containers/Auth/SignIn';
import { readCookie } from './utils/storage';

const App = () => {
  const { userInfo } = useSelector((reducer) => reducer[REDUCERS.common]);

  const router = createBrowserRouter([
    {
      path: PATHS.home,
      element: userInfo?.isLoggedIn ? <div>Home</div> : <Navigate to={PATHS.signin} />,
      exact: true,
    },
    {
      path: PATHS.signin,
      element: <SignIn />,
      exact: true,
    },
  ]);

  useEffect(() => {
    if (!userInfo) {
      const cookieData = readCookie('user');
      console.log(cookieData)
    }
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
