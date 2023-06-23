import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex } from '@chakra-ui/layout';

import Header from '../../Components/Common/Header/Header';
import WritePost from '../../Components/Home/WritePost/WritePost';
import Feeds from '../../Components/Home/Feeds/Feeds';
import FollowersFollowing from '../../Components/Home/FollowersFoloowing/FollowersFollowing';
import ChatMessages from '../../Components/Chat/ChatMessages/ChatMessages';
import Chat from '../Chat/Chat';

import { REDUCERS } from '../../constants';
import { headerHeight } from '../../Components/Common/Header/constants';
import { fetchConversationListThunk, getPushUserThunk } from '../Chat/chatAsynkThunks';
import colors from '../../styles/colors';
import { triggerAlert } from '../../utils/common';

const boxWidth = 25;
const boxPadding = 6;

const Home = () => {
  const dispatch = useDispatch();

  const { pushUser, key } = useSelector((state) => state[REDUCERS.chat]);

  const [chatId, setChatId] = useState(null);

  const handleOpenChat = ({ walletAddress, conversationHash, source }) => {
    if (pushUser && key) {
      if (!chatId) setChatId({ walletAddress, conversationHash, source });

      dispatch(fetchConversationListThunk({ walletAddress, conversationHash }));
    } else {
      triggerAlert('error', 'Push not authenticated');

      dispatch(getPushUserThunk());
    }
  };

  const handleCloseChat = () => {
    setChatId(null);
  };

  return (
    <>
      <Flex
        bg={colors.pageBackground}
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
