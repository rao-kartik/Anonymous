import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, Text } from '@chakra-ui/layout';

import { REDUCERS } from '../../constants';
import { Button, IconButton } from '@chakra-ui/button';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/input';
import { addressPrefix } from '../../utils/common';
import { approveChatRequestThunk, sendMessageThunk } from './chatAsynkThunks';

import styles from './chat.module.scss';
import { Spinner } from '@chakra-ui/spinner';

const Chat = ({ receiver, onClose, source }) => {
  const dispatch = useDispatch();
  const { loader, conversationList } = useSelector((state) => state[REDUCERS.chat]);

  const [msgInput, setMsgInput] = useState('');

  const handleMsgInputChange = (e) => {
    const { value } = e.target;

    setMsgInput(value);
  };

  const handleSend = (e) => {
    e.preventDefault();

    if (msgInput?.length > 0) {
      const payload = {
        messageContent: msgInput,
        receiverAddress: receiver?.includes(addressPrefix) ? receiver : addressPrefix + receiver,
      };

      if (source === 'chatRequest') {
        dispatch(approveChatRequestThunk(receiver));
      }

      dispatch(sendMessageThunk(payload));
    }

    setMsgInput('');
  };

  return (
    <Box
      w={350}
      h={500}
      bg="#fff"
      position="fixed"
      right={4}
      bottom={4}
      borderRadius={20}
      overflow="hidden"
      className={styles['chat-top-wrapper']}
    >
      <Box position={'relative'} p={4} boxShadow="base">
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

      <Flex
        h="74.5%"
        overflowY="auto"
        p={4}
        flexDirection="column-reverse"
        gap={4}
        {...(loader?.conversationList
          ? { justifyContent: 'center', alignItems: 'center' }
          : { justifyContent: 'flex-start' })}
      >
        {loader?.conversationList ? (
          <Spinner speed="1s" emptyColor="#b2bec3" color="#ff7675" size="lg" thickness="4px" />
        ) : (
          conversationList?.map((_message) => {
            const isReceiver = receiver?.includes(addressPrefix)
              ? _message?.fromDID === receiver
              : _message?.fromDID?.split(addressPrefix)?.[1] === receiver;

            return (
              <React.Fragment key={_message?.chatId}>
                {_message?.messageContent !== '' && (
                  <Flex w="100%" flexDirection={isReceiver ? 'row' : 'row-reverse'}>
                    <Box
                      py={1}
                      px={3}
                      maxW="80%"
                      bg={isReceiver ? '#636e72' : '#00b894'}
                      rounded={12}
                      fontSize="sm"
                      color={isReceiver ? '#fff' : '#fff'}
                    >
                      {_message?.messageContent}
                    </Box>
                  </Flex>
                )}
              </React.Fragment>
            );
          })
        )}
      </Flex>

      <form onClick={handleSend}>
        <Flex position={'relative'} p={4} boxShadow="xs" gap={4}>
          <Input onChange={handleMsgInputChange} value={msgInput} />

          <Button type="submit" disabled={!loader.fetchingUser}>
            Send
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default Chat;
