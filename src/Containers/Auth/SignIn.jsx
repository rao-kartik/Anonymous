import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button } from '@chakra-ui/react';
import { Buffer } from 'buffer';

import MetamaskLogo from '../../Logos/MetamaskLogo';

import { authenticateUserThunk } from '../Common/asyncThunks';
import { REDUCERS } from '../../constants';

import styles from './signin.module.scss';
import { triggerAlert } from '../../utils/common';
import { getEtherSigner, signTransaction } from '../../utils/ether';

const SignIn = (props) => {
  const { background = '#EFF6E0', color = '#000' } = props;

  const { loader } = useSelector((reducer) => reducer[REDUCERS.common]);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      if (typeof window !== 'undefined' && window?.ethereum) {
        await window?.ethereum?.request({ method: 'eth_requestAccounts' });

        const provider = await getEtherSigner();

        const account = provider?.account;

        const host = window?.location?.host;
        const siweMessage = `${host} wants to sign in with your ethereum account:\n${account}.\n\n Sign to access the content`;
        const message = `0x${Buffer.from(siweMessage, 'utf8').toString('hex')}`;

        await signTransaction(message, account);

        dispatch(authenticateUserThunk(account));
      }
    } catch (err) {
      console.log(err);
      triggerAlert('error', err.message);
    }
  };

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
