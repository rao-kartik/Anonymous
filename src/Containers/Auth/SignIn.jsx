import React, { useEffect } from 'react';
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Flex, useToast } from '@chakra-ui/react';

import MetamaskLogo from '../../Logos/MetamaskLogo';

import { authenticateUserThunk } from '../Common/asyncThunks';
import { PATHS, REDUCERS } from '../../constants';

import styles from './signin.module.scss';

const SignIn = () => {
  const { userInfo, error, loader } = useSelector((reducer) => reducer[REDUCERS.common]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async () => {
    try {
      if (typeof window !== 'undefined' && window?.ethereum) {
        await window?.ethereum?.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window?.ethereum);

        const accounts = await web3?.eth?.getAccounts();

        dispatch(authenticateUserThunk(accounts[0]));
      }
    } catch (err) {
      toast({
        title: err?.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  useEffect(() => {
    if (userInfo?.isLoggedIn) {
      toast({
        title: 'SignIn Successful',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });

      navigate(PATHS.home);
    }
  }, [userInfo?.isLoggedIn]);

  useEffect(() => {
    if (error?.auth) {
      toast({
        title: error?.authMessage,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
  }, [error?.auth, error.authMessage]);

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
        disabled={loader?.auth}
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
