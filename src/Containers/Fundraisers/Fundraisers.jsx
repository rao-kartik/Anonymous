import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Flex, Heading, Modal } from '@chakra-ui/react';

import Header from '../../Components/Common/Header/Header';

import { fetchContractDetailsThunk } from './fundraiserThunk';
import { REDUCERS } from '../../constants';
import { headerHeight } from '../../Components/Common/Header/constants';
import colors from '../../styles/colors';

const Fundraisers = () => {
  const dispatch = useDispatch();
  const { contractDetails } = useSelector((state) => state?.[REDUCERS?.fundraiser]);

  const contractFetched = useRef(false);

  useEffect(() => {
    if (!contractFetched?.current) {
      dispatch(fetchContractDetailsThunk());
      contractFetched.current = true;
    }
  }, []);

  useEffect(() => {
    if (contractDetails) {
    }
  }, [contractDetails]);

  return (
    <>
      <Header />

      <Box p={6} paddingTop={headerHeight + 6} minH="100vh" bg={colors.pageBackground}>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading color={colors.white}>Fundraisers</Heading>

          <Button bg={colors.white}>Start New Fundraiser</Button>
        </Flex>
      </Box>
    </>
  );
};

export default Fundraisers;
