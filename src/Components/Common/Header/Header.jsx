import React from 'react';
import { Box, Flex } from '@chakra-ui/layout';

import { headerHeight } from './constants';
import { NavLink } from 'react-router-dom';
import { PATHS } from '../../../constants';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <Flex
      w="100vw"
      h={headerHeight}
      bg="#f6bd60"
      boxShadow="md"
      alignItems="center"
      position="fixed"
      top={0}
      left={0}
      zIndex={10}
    >
      <Box w="20%"></Box>
      <Flex w="60%" gap={50}>
        <NavLink
          to={PATHS?.home}
          className={({ isActive, isPending }) => {
            console.log(isActive);
            return isPending ? styles?.inactive : isActive ? styles?.active : styles?.inactive;
          }}
        >
          Home
        </NavLink>
        <NavLink
          to={PATHS?.groups}
          className={({ isActive, isPending }) => {
            return isPending ? styles?.inactive : isActive ? styles?.active : styles?.inactive;
          }}
        >
          Groups
        </NavLink>
      </Flex>
      <Box w="20%"></Box>
    </Flex>
  );
};

export default Header;
