import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, Text } from '@chakra-ui/layout';

import Header from '../../Components/Common/Header/Header';

import { headerHeight } from '../../Components/Common/Header/constants';
import WritePost from '../../Components/Home/WritePost/WritePost';
import Feeds from '../../Components/Home/Feeds/Feeds';
import Chat from '../Chat/Chat';
import FollowersFollowing from '../../Components/Home/FollowersFoloowing/FollowersFollowing';
import { fetchConversationListThunk, getPushUserThunk } from '../Chat/chatAsynkThunks';
import { REDUCERS } from '../../constants';

const boxWidth = 25;
const boxPadding = 6;

const Home = () => {
  const dispatch = useDispatch();

  const { pushUser } = useSelector((state) => state[REDUCERS.chat]);

  const [chatId, setChatId] = useState(null);

  const handleOpenChat = (walletAddress) => {
    if (!chatId) setChatId(walletAddress);

    dispatch(fetchConversationListThunk(walletAddress));
  };

  const handleCloseChat = () => {
    setChatId(null);
  };

  useEffect(() => {
    if (!pushUser) dispatch(getPushUserThunk());
  }, []);

  return (
    <>
      <Flex
        bg="#f0f2f5"
        h="100vh"
        w="100vw"
        position="relative"
        p={boxPadding}
        pt={headerHeight + boxPadding}
      >
        <Header />

        <Box w={`${boxWidth}%`} h="100%">
          <Text>Profile</Text>
        </Box>
        <Box
          w={`calc(100% - ${2 * boxWidth}%)`}
          h="100%"
          overflowY="auto"
          className="hide-scrollbar"
        >
          <WritePost />

          <Feeds />
        </Box>
        <Flex
          w={`${boxWidth}%`}
          h="100%"
          bg="#fff"
          p={4}
          borderRadius={8}
          flexDirection="column"
          gap={4}
        >
          <FollowersFollowing handleOpenChat={handleOpenChat} />
        </Flex>
      </Flex>

      {chatId && <Chat receiver={chatId} onClose={handleCloseChat} />}
    </>
  );
};

export default memo(Home);
