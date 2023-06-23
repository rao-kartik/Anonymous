import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';

import Header from '../../Components/Common/Header/Header';

import { fetchContractDetailsThunk } from './fundraiserThunk';
import { REDUCERS } from '../../constants';
import { headerHeight } from '../../Components/Common/Header/constants';
import colors from '../../styles/colors';
import NewFundraiser from '../../Components/Fundraiser/NewFundraiser/NewFundraiser';
import { connectToContract } from './util';

const Fundraisers = () => {
  const dispatch = useDispatch();
  // const { contractDetails } = useSelector((state) => state?.[REDUCERS?.fundraiser]);
  const [contractDetails, setContractDetails] = useState(null);

  const [startFundraiser, setStartFundraiser] = useState(false);
  const contractFetched = useRef(false);

  useEffect(() => {
    if (!contractFetched?.current) {
      // dispatch(fetchContractDetailsThunk());
      setContractDetails(connectToContract());
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

          <Button bg={colors.white} onClick={() => setStartFundraiser(true)}>
            Start New Fundraiser
          </Button>
        </Flex>
      </Box>

      <NewFundraiser
        open={startFundraiser}
        onClose={() => setStartFundraiser(false)}
        contractDetails={contractDetails}
      />
    </>
  );
};

export default Fundraisers;
