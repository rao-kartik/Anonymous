import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Button, IconButton } from '@chakra-ui/button';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/input';
import { Spinner } from '@chakra-ui/spinner';
import { Checkbox, Tooltip } from '@chakra-ui/react';
import { EVENTS } from '@pushprotocol/socket';

import { REDUCERS } from '../../constants';
import { addressPrefix, triggerAlert } from '../../utils/common';
import { approveChatRequestThunk, sendMessageThunk } from './chatAsynkThunks';
import { connectToSocket } from '../../utils/socket';
import { setConversationList } from './chatSlice';
import { signTransaction } from '../../utils/ether';

import styles from './chat.module.scss';

const Chat = ({ receiver, onClose, source }) => {
  const dispatch = useDispatch();
  const { loader, conversationList, key } = useSelector((state) => state[REDUCERS.chat]);
  const { userInfo } = useSelector((state) => state[REDUCERS.common]);

  const [msgInput, setMsgInput] = useState('');
  const [socketConnect, setSocketConnect] = useState(null);
  const [connected, setConnected] = useState(false);
  const [enableSignEveryMessage, setEnableSignEveryMessage] = useState(true);

  const handleMsgInputChange = (e) => {
    const { value } = e.target;

    setMsgInput(value);
  };

  const handleSend = async (e) => {
    e.preventDefault();

    try {
      if (msgInput?.length > 0) {
        if (enableSignEveryMessage) {
          const message = `Do you want to send the message: ${msgInput}\n\nto ${receiver}`;
          await signTransaction(message);
        }

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
      return;
    } catch (err) {
      triggerAlert('error', err.message);
    }
  };

  const handleEnableSignEveryMsg = async (e) => {
    try {
      const { checked } = e.target;

      if (!checked) {
        const message = `Do you want to disable the message signing.`;
        await signTransaction(message);
      }

      setEnableSignEveryMessage(checked);

      return;
    } catch (err) {
      triggerAlert('error', err.message);
    }
  };

  // SOCKET
  const addSocketEvents = () => {
    socketConnect?.on(EVENTS.CONNECT, () => {
      setConnected(true);
    });

    socketConnect?.on(EVENTS.DISCONNECT, () => {
      setConnected(false);
    });

    socketConnect?.on(EVENTS.CHAT_RECEIVED_MESSAGE, async (message) => {
      dispatch(setConversationList(message));
    });
  };

  const removeSocketEvents = () => {
    socketConnect?.off(EVENTS.CONNECT);
    socketConnect?.off(EVENTS.DISCONNECT);
  };

  useEffect(() => {
    if (socketConnect) {
      addSocketEvents();
    }
    return () => {
      removeSocketEvents();
    };
  }, [socketConnect]);

  useEffect(() => {
    if (!socketConnect) {
      setSocketConnect(
        connectToSocket(
          userInfo?.walletAddress?.includes(addressPrefix)
            ? userInfo?.walletAddress
            : addressPrefix + userInfo?.walletAddress,
          key,
          'chat'
        )
      );
    }

    return () => {
      if (socketConnect) {
        socketConnect.disconnect();
      }
    };
  }, []);

  return (
    <Box
      w={350}
      h={500}
      bg="#95a5a6"
      position="fixed"
      right={4}
      bottom={4}
      borderRadius={20}
      overflow="hidden"
      className={styles['chat-top-wrapper']}
    >
      <Flex
        position={'relative'}
        p={4}
        boxShadow="base"
        bg="#bdc3c7"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text className={styles.title} fontWeight={600} position="relative">
          Chat
        </Text>
        <Flex gap={1} alignItems="center">
          <Tooltip
            label={enableSignEveryMessage ? 'Disable message signing' : 'Enable message signing'}
            placement="bottom"
          >
            <Button bg="none" _hover={{ bg: ' none' }} px={2} py={1} minW="auto" h="fit-content">
              <Checkbox isChecked={enableSignEveryMessage} onChange={handleEnableSignEveryMsg} />
            </Button>
          </Tooltip>
          <IconButton p={0} w={6} minW={6} maxW={6} h={6} onClick={onClose}>
            <SmallCloseIcon m={0} p={0} />
          </IconButton>
        </Flex>
      </Flex>

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
        <Flex position={'relative'} p={4} boxShadow="xs" gap={4} bg="#bdc3c7">
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
