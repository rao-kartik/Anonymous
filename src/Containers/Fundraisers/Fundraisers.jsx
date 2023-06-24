import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';

import Header from '../../Components/Common/Header/Header';

import { headerHeight } from '../../Components/Common/Header/constants';
import colors from '../../styles/varaibles';
import NewFundraiser from '../../Components/Fundraiser/NewFundraiser/NewFundraiser';
import { connectToContract } from '../../utils/ether';
import { useDispatch } from 'react-redux';
import { setAllFundraiser, setFundraiserReducer } from './fundraiserSlice';
import { triggerAlert } from '../../utils/common';
import { formatFundraiserData } from './util';
import AllFundraisers from '../../Components/Fundraiser/AllFundraisers/AllFundraisers';

const Fundraisers = () => {
  const dispatch = useDispatch();
  const [contractDetails, setContractDetails] = useState(null);

  const [startFundraiser, setStartFundraiser] = useState(false);
  const contractFetched = useRef(false);

  const handleFetchContractDetails = async () => {
    try {
      dispatch(setFundraiserReducer({ loader: { setAllFundraiser: true } }));
      const contract = await connectToContract();
      setContractDetails(contract);

      let totalFundraisers = await contract?.getTotalFundraisers();
      totalFundraisers = totalFundraisers?.toNumber();
      dispatch(setFundraiserReducer({ totalFundraisers }));

      if (totalFundraisers > 0) {
        for (let i = 0; i < totalFundraisers; i++) {
          let fR = await contract.fundRaisers(i);
          const isBlacklisted = await contract?.blacklistedFundraisers(i);
          fR = formatFundraiserData({ ...fR, id: i }, isBlacklisted);
          dispatch(setAllFundraiser({ [i]: fR }));
        }
      }
      dispatch(setFundraiserReducer({ loader: { setAllFundraiser: false } }));
      return;
    } catch (err) {
      triggerAlert('error', err?.message);
      dispatch(setFundraiserReducer({ loader: { setAllFundraiser: false } }));
      return;
    }
  };

  useEffect(() => {
    if (!contractFetched?.current) {
      handleFetchContractDetails();
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

        <AllFundraisers contract={contractDetails} />
      </Box>

      <NewFundraiser
        open={startFundraiser}
        onClose={() => setStartFundraiser(false)}
        contract={contractDetails}
      />
    </>
  );
};

export default Fundraisers;
