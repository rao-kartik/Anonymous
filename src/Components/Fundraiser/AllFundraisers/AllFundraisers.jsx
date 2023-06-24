import React from 'react';
import { useSelector } from 'react-redux';
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
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import moment from 'moment';
import colors from '../../../styles/colors';

const AllFundraisers = () => {
  const { allFundraisers } = useSelector((state) => state[REDUCERS?.fundraiser]);
  console.log(allFundraisers);

  return (
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
                  <Button>Donate</Button>
                </Flex>
              </CardFooter>
            </Card>
          );
        })}
    </Grid>
  );
};

export default AllFundraisers;
