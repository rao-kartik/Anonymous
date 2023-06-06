import React from 'react';
import { Box, Flex } from '@chakra-ui/layout';

import { headerHeight } from './constants';

const Header = () => {
  return (
    <Flex
      w="100vw"
      h={headerHeight}
      bg="#ffffff"
      boxShadow="md"
      alignItems="center"
      position="fixed"
      top={0}
      left={0}
      zIndex={10}
    >
      <Box w="20%"></Box>
      <Box w="60%">Home</Box>
      <Box w="20%"></Box>
    </Flex>
  );
};

export default Header;
