import React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';

import Header from '../../Components/Common/Header/Header';

import { headerHeight } from '../../Components/Common/Header/constants';
import WritePost from '../../Components/Home/WritePost/WritePost';
import Feeds from '../../Components/Home/Feeds/Feeds';

const boxWidth = 25;
const boxPadding = 6;

const Home = () => {
  return (
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
      <Box w={`calc(100% - ${2 * boxWidth}%)`} h="100%" overflowY="auto" className="hide-scrollbar">
        <WritePost />

        <Feeds />
      </Box>
      <Box w={`${boxWidth}%`} h="100%">
        <Heading size="md">Followers</Heading>
      </Box>
    </Flex>
  );
};

export default Home;
