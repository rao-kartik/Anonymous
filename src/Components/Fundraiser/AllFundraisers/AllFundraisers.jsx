import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REDUCERS } from '../../../constants';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Grid,
  Heading,
  Text,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter,
  Spinner,
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import moment from 'moment';
import colors, { spinnerConfig } from '../../../styles/varaibles';
import { useState } from 'react';
import { triggerAlert } from '../../../utils/common';
import {
  setAllFundraiser,
  setFundraiserReducer,
} from '../../../Containers/Fundraisers/fundraiserSlice';
import { formatFundraiserData } from '../../../Containers/Fundraisers/util';

const AllFundraisers = (props) => {
  const dispatch = useDispatch();
  const { allFundraisers, loader } = useSelector((state) => state[REDUCERS?.fundraiser]);

  const { contract } = props;

  const [amount, setAmount] = useState('');
  const [txDetail, setTxDetail] = useState(null);

  const [openDonateModal, setOpenDonateModal] = useState(null);

  const handleOpenDonateFundModal = (data) => {
    setOpenDonateModal({ open: true, data });
  };

  const handleCloseModal = () => {
    setOpenDonateModal(null);
    if (txDetail) {
      setTxDetail(null);
    }
    if (amount) {
      setAmount('');
    }
  };

  const handleInpChange = (e) => {
    const { value } = e.target;
    setAmount(value);
  };

  const handleDonate = async () => {
    if (!txDetail) {
      try {
        dispatch(setFundraiserReducer({ loader: { donate: true } }));
        const { data } = openDonateModal;
        const amountNeeded = data?.amount - data?.amountRaised;
        if (amount === 0) {
          triggerAlert('error', `Invalid amount`);
          dispatch(setFundraiserReducer({ loader: { donate: false } }));
          return;
        }
        if (amountNeeded < amount) {
          triggerAlert('error', `Amount should be less than ${amountNeeded} Wei`);
          dispatch(setFundraiserReducer({ loader: { donate: false } }));
          return;
        }
        const tx = await contract?.donateFunds(data?.id, { value: amount });

        tx.wait();

        triggerAlert('success', 'Donation Successsful');
        setTxDetail(tx);
        let fR = await await contract?.fundRaisers(data?.id);
        const isBlacklisted = await contract?.blacklistedFundraisers(data?.id);
        fR = formatFundraiserData({ ...fR, id: data?.id }, isBlacklisted);
        dispatch(setAllFundraiser({ [data?.id]: fR }));
        dispatch(setFundraiserReducer({ loader: { donate: false } }));
        setAmount('');
        return;
      } catch (err) {
        triggerAlert('error', err?.message);
        dispatch(setFundraiserReducer({ loader: { donate: false } }));
        return;
      }
    } else {
      handleCloseModal();
    }
  };

  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap={5} paddingY={6}>
        {Object.values(allFundraisers)?.length > 0 &&
          Object.values(allFundraisers)?.map((_fR) => {
            const { isBlacklisted, isActive } = _fR;

            return (
              <Card key={_fR?.id} bg={(isBlacklisted && '#FB483DB3') || (!isActive && '#E1793FB3')}>
                <CardHeader>
                  <Heading size="sm" noOfLines={1}>
                    {_fR?.raisedFor}
                  </Heading>
                </CardHeader>

                <CardBody paddingY={0}>
                  <Text>
                    Amount Needed:{' '}
                    <span
                      style={{
                        fontWeight: 600,
                        color: !isActive || isBlacklisted ? colors?.white : colors?.fundraiserValue,
                      }}
                    >
                      {' '}
                      {ethers.utils.formatEther(_fR?.amount)} ETH
                    </span>
                  </Text>
                  <Text>
                    Amount Raised:{' '}
                    <span
                      style={{
                        fontWeight: 600,
                        color: !isActive || isBlacklisted ? colors?.white : colors?.fundraiserValue,
                      }}
                    >
                      {ethers.utils.formatEther(_fR?.amountRaised)} ETH
                    </span>
                  </Text>
                  <Text>
                    Started On:{' '}
                    <span
                      style={{
                        fontWeight: 600,
                        color: !isActive || isBlacklisted ? colors?.white : colors?.fundraiserValue,
                      }}
                    >
                      {moment(_fR?.createdOn).format('DD MMM YYYY')} at{' '}
                      {moment(_fR?.createdOn).format('h:mm A')}
                    </span>
                  </Text>
                  <Text>
                    Total Donors:{' '}
                    <span
                      style={{
                        fontWeight: 600,
                        color: !isActive || isBlacklisted ? colors?.white : colors?.fundraiserValue,
                      }}
                    >
                      {_fR?.totalSupportors} people
                    </span>
                  </Text>
                  <Text>
                    Category:{' '}
                    <span
                      style={{
                        fontWeight: 600,
                        color: !isActive || isBlacklisted ? colors?.white : colors?.fundraiserValue,
                        textTransform: 'capitalize',
                      }}
                    >
                      {_fR?.category?.toLowerCase()}
                    </span>
                  </Text>
                  <Text>
                    Reason:{' '}
                    <span
                      style={{
                        fontWeight: 600,
                        color: !isActive || isBlacklisted ? colors?.white : colors?.fundraiserValue,
                      }}
                    >
                      {_fR?.about}
                    </span>
                  </Text>
                  <Text>
                    Status:{' '}
                    <span
                      style={{
                        fontWeight: 600,
                        color: !isActive || isBlacklisted ? colors?.white : colors?.fundraiserValue,
                      }}
                    >
                      {isActive ? 'Active' : 'Inactive'}
                    </span>
                  </Text>
                  <Text>
                    Blacklisted Status:{' '}
                    <span
                      style={{
                        fontWeight: 600,
                        color: !isActive || isBlacklisted ? colors?.white : colors?.fundraiserValue,
                      }}
                    >
                      {isBlacklisted ? 'Blacklisted' : 'Not Blacklisted'}
                    </span>
                  </Text>
                  <Text>
                    <span
                      style={{
                        fontWeight: 600,
                        color: !isActive || isBlacklisted ? colors?.white : colors?.fundraiserValue,
                      }}
                    ></span>
                  </Text>
                </CardBody>

                <CardFooter>
                  <Flex w="100%" justifyContent="flex-end">
                    <Button onClick={() => handleOpenDonateFundModal(_fR)}>Donate</Button>
                  </Flex>
                </CardFooter>
              </Card>
            );
          })}
        <Modal isOpen={openDonateModal?.open} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {txDetail ? 'Donation Successful' : 'Enter the amount you want to donate'}
            </ModalHeader>
            <ModalBody>
              {txDetail ? (
                <Text>
                  Gas Cost:{' '}
                  <span style={{ fontWeight: 600 }}>{txDetail?.gasPrice?.toNumber()} Wei</span>
                </Text>
              ) : (
                <Input
                  type="number"
                  placeholder="Enter amount"
                  onChange={handleInpChange}
                  isInvalid={
                    amount === 0 ||
                    amount > openDonateModal?.data?.amont - openDonateModal?.data?.amountRaised
                  }
                  value={amount}
                  errorBorderColor="FB483D"
                />
              )}
            </ModalBody>

            <ModalFooter>
              <Button onClick={handleDonate}>
                {loader?.donate ? <Spinner {...spinnerConfig} /> : txDetail ? 'Close' : 'Donate'}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Grid>
    </>
  );
};

export default AllFundraisers;
