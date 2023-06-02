import React from 'react';
import { Button, Flex } from '@chakra-ui/react';
import Web3 from 'web3';

import styles from './signin.module.scss';
import MetamaskLogo from '../../Logos/MetamaskLogo';

const SignIn = () => {
  const handleLogin = async () => {
    if (typeof window !== 'undefined' && window?.ethereum) {
      await window?.ethereum?.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window?.ethereum);

      const accounts = await web3?.eth?.getAccounts();
      console.log(accounts)
    }
  };

  return (
    <Flex justify="center" align="center" w="100vw" h="100vh">
      <Button
        bg="#ffffff"
        color="#000"
        boxShadow="base"
        size="md"
        gap={10}
        py={6}
        px={10}
        onClick={handleLogin}
      >
        <span className={styles['metamask-logo-wrapper']}>
          <MetamaskLogo />
        </span>{' '}
        Signin with Metamask
      </Button>
    </Flex>
  );
};

export default SignIn;
