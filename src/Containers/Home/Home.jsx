import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';

import Header from '../../Components/Common/Header/Header';

import { headerHeight } from '../../Components/Common/Header/constants';
import WritePost from '../../Components/Home/WritePost/WritePost';
import Feeds from '../../Components/Home/Feeds/Feeds';
import Chat from '../Chat/Chat';
import FollowersFollowing from '../../Components/Home/FollowersFoloowing/FollowersFollowing';
import { fetchConversationListThunk, getPushUserThunk } from '../Chat/chatAsynkThunks';
import { REDUCERS } from '../../constants';
import ChatMessages from '../../Components/Chat/ChatMessages/ChatMessages';

const boxWidth = 25;
const boxPadding = 6;

const Home = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const { pushUser, key } = useSelector((state) => state[REDUCERS.chat]);

  const [chatId, setChatId] = useState(null);

  const handleOpenChat = ({ walletAddress, conversationHash, source }) => {
    if (pushUser && key) {
      if (!chatId) setChatId({ walletAddress, conversationHash, source });

      dispatch(fetchConversationListThunk({ walletAddress, conversationHash }));
    } else {
      toast({
        title: 'Push not authenticated',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });

      dispatch(getPushUserThunk());
    }
  };

  const handleCloseChat = () => {
    setChatId(null);
  };

  return (
    <>
      <Flex
        bg="#124559"
        h="100vh"
        w="100vw"
        position="relative"
        p={boxPadding}
        pt={headerHeight + boxPadding}
      >
        <Header />

        <Flex w={`${boxWidth}%`} h="100%" flexDirection="column" gap={4}>
          <FollowersFollowing handleOpenChat={handleOpenChat} />
        </Flex>

        <Box
          w={`calc(100% - ${2 * boxWidth}%)`}
          h="100%"
          overflowY="auto"
          className="hide-scrollbar"
        >
          <WritePost />

          <Feeds />
        </Box>

        <Flex w={`${boxWidth}%`} h="100%" flexDirection="column" gap={4}>
          <ChatMessages handleOpenChat={handleOpenChat} />
        </Flex>
      </Flex>

      {chatId?.walletAddress && (
        <Chat
          receiver={chatId?.walletAddress}
          onClose={handleCloseChat}
          source={chatId?.source}
          conversationHash={chatId?.conversationHash}
        />
      )}
    </>
  );
};

export default memo(Home);
