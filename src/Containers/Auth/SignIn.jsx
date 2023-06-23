import React, { useEffect } from 'react';
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, useToast } from '@chakra-ui/react';

import MetamaskLogo from '../../Logos/MetamaskLogo';

import { authenticateUserThunk } from '../Common/asyncThunks';
import { PATHS, REDUCERS } from '../../constants';

import styles from './signin.module.scss';

const SignIn = (props) => {
  const { background = '#EFF6E0', color = '#000' } = props;

  const { userInfo, error, loader, messages } = useSelector((reducer) => reducer[REDUCERS.common]);

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
        title: messages?.authMessage,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
  }, [error?.auth, messages?.authMessage]);

  return (
    <Box position="relative">
      <Button
        bg={background}
        color={color}
        boxShadow="base"
        size="md"
        gap={3}
        py={6}
        px={10}
        onClick={handleLogin}
        disabled={loader?.auth}
        _hover={{ background, opacity: '0.8', cursor: 'pointer' }}
      >
        <span className={styles['metamask-logo-wrapper']}>
          <MetamaskLogo />
        </span>{' '}
        Signin with Metamask
      </Button>
    </Box>
  );
};

export default SignIn;
