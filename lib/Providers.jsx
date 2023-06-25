'use client';
import { Provider } from 'react-redux';

import { reduxStore } from '@/lib/redux';
import { ChakraProvider } from '@chakra-ui/react';
import { CacheProvider } from '@chakra-ui/next-js';

const Providers = (props) => {
  return (
    <Provider store={reduxStore}>
      <CacheProvider>
        <ChakraProvider>{props.children}</ChakraProvider>
      </CacheProvider>
    </Provider>
  );
};

export default Providers;
