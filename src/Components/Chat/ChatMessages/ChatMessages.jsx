import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import React from 'react';
import { useSelector } from 'react-redux';
import { REDUCERS } from '../../../constants';
import { EmailIcon } from '@chakra-ui/icons';
import { addressPrefix } from '../../../utils/common';

const followersFlex = {
  w: '100%',
  h: '82%',
  flexDirection: 'column',
  gap: 4,
  overflowY: 'auto',
  my: 4,
  fontSize: 'sm',
};

const followersWrapper = {
  gap: 4,
  justifyContent: 'space-between',
  alignItems: 'center',
};

const followerText = {
  w: '80%',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  fontSize: 'sm',
  overflow: 'hidden',
};

const ChatMessages = (props) => {
  const { userInfo } = useSelector((state) => state[REDUCERS.common]);
  const { chatRequests, chatsList } = useSelector((state) => state[REDUCERS.chat]);

  const { handleOpenChat } = props;

  return (
    <>
      <Box w="100%" h="50%" overflow="hidden" bg="#f7ede2" p={4} borderRadius={8}>
        <Heading size="md">Chats</Heading>

        <Flex
          {...followersFlex}
          {...(chatsList?.length === 0 ? { justifyContent: 'center', alignItems: 'center' } : {})}
        >
          {chatsList?.length === 0
            ? 'No Chat Started'
            : chatsList?.map((_chat) => {
                const sender = _chat?.msg?.toDID?.includes(userInfo?.walletAddress)
                  ? _chat?.msg?.fromDID
                  : _chat?.msg?.toDID;

                return (
                  <Flex
                    {...followersWrapper}
                    onClick={() =>
                      handleOpenChat({
                        walletAddress: sender,
                        conversationHash: { threadHash: _chat?.threadhash },
                        source: 'chat',
                      })
                    }
                    key={_chat?.chatId}
                  >
                    <Text {...followerText}>{sender?.split(addressPrefix)[1]}</Text>

                    <EmailIcon _hover={{ cursor: 'pointer' }} />
                  </Flex>
                );
              })}
        </Flex>
      </Box>

      <Box w="100%" h="50%" overflow="hidden" bg="#f7ede2" p={4} borderRadius={8}>
        <Heading size="md">Chat Requests</Heading>

        <Flex
          {...followersFlex}
          {...(chatRequests?.length === 0
            ? { justifyContent: 'center', alignItems: 'center' }
            : {})}
        >
          {chatRequests?.length === 0
            ? 'No Chat Requests'
            : chatRequests?.map((_chatRequest) => (
                <Flex
                  {...followersWrapper}
                  onClick={() =>
                    handleOpenChat({
                      walletAddress: _chatRequest?.did,
                      conversationHash: { threadHash: _chatRequest?.threadhash },
                      source: 'chatRequest',
                    })
                  }
                  key={_chatRequest?.chatId}
                >
                  <Text {...followerText}>{_chatRequest?.did?.split(addressPrefix)[1]}</Text>

                  <EmailIcon _hover={{ cursor: 'pointer' }} />
                </Flex>
              ))}
        </Flex>
      </Box>
    </>
  );
};

export default ChatMessages;
