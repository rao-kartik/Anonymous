import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { PATHS, REDUCERS } from './constants';

import SignIn from './Containers/Auth/SignIn';
import Home from './Containers/Home/Home';

const App = () => {
  const { userInfo } = useSelector((reducer) => reducer[REDUCERS.common]);

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

  return <RouterProvider router={router} />;
};

export default App;
