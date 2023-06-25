'use client';
import React from 'react';

import CommonToast from '@/HOC/CommonToast/CommonToast';

const Home = () => {
  return <div>Home</div>;
};

const withToast = CommonToast();

export default withToast(Home);
