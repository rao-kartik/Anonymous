import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ethers } from 'ethers';
import { Box, Flex, Text } from '@chakra-ui/layout';

import { REDUCERS } from '../../constants';
import { Button, IconButton } from '@chakra-ui/button';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/input';

const Chat = ({ user, onClose }) => {
  const { userInfo } = useSelector((state) => state[REDUCERS.common]);
  const [signer, setSigner] = useState(null);

  const [msgInput, setMsgInput] = useState('');

  const handleMsgInputChange = (e) => {
    const { value } = e.target;

    setMsgInput(value);
  };

  const handleSend = (e) => {
    e.preventDefault();

    setMsgInput('');
  };

  const connectToWeb3 = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();

    const _signer = provider.getSigner(accounts[0]);
    setSigner(accounts[0]);
  };

  useEffect(() => {
    connectToWeb3();
  }, []);

  return (
    <Box
      w={350}
      h={500}
      bg="#fff"
      position="fixed"
      left={4}
      bottom={4}
      borderRadius={20}
      boxShadow="md"
      overflow="hidden"
    >
      <Box position={'relative'} p={4} boxShadow="md">
        <Text fontWeight={600}>Chat</Text>
        <IconButton
          p={0}
          w={6}
          minW={6}
          maxW={6}
          h={6}
          position="absolute"
          right={4}
          top={4}
          onClick={onClose}
        >
          <SmallCloseIcon m={0} p={0} />
        </IconButton>
      </Box>

      <Flex h="74.5%" overflowY="auto" p={4}></Flex>

      <form onClick={handleSend}>
        <Flex position={'relative'} p={4} boxShadow="md" gap={4}>
          <Input onChange={handleMsgInputChange} value={msgInput} />

          <Button type="submit">Send</Button>
        </Flex>
      </form>
    </Box>
  );
};

export default Chat;
