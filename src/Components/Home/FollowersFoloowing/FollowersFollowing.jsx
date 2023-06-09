import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import React from 'react';
import { useSelector } from 'react-redux';
import { REDUCERS } from '../../../constants';
import { EmailIcon } from '@chakra-ui/icons';

const followersFlex = {
  w: '100%',
  h: '82%',
  flexDirection: 'column',
  gap: 4,
  overflowY: 'auto',
  my: 4,
  fontSize: 'sm',
};

const followersWrapper = {
  gap: 4,
  justifyContent: 'space-between',
  alignItems: 'center',
};

const followerText = {
  w: '80%',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  fontSize: 'sm',
  overflow: 'hidden',
};

const FollowersFollowing = ({ handleOpenChat }) => {
  const { userInfo } = useSelector((reducer) => reducer[REDUCERS.common]);

  return (
    <>
      <Box w="100%" h="50%" overflow="hidden" borderBottom="1px solid #dfe6e9">
        <Heading size="md">Followers</Heading>

        <Flex
          {...followersFlex}
          {...(userInfo?.followers?.length === 0
            ? { justifyContent: 'center', alignItems: 'center' }
            : {})}
        >
          {userInfo?.followers?.length === 0
            ? 'No Followers'
            : userInfo?.followers?.map((_follower) => (
                <Flex
                  {...followersWrapper}
                  onClick={() => handleOpenChat({ walletAddress: _follower?.walletAddress })}
                  key={_follower?.id}
                >
                  <Text {...followerText}>{_follower?.walletAddress}</Text>

                  <EmailIcon _hover={{ cursor: 'pointer' }} />
                </Flex>
              ))}
        </Flex>
      </Box>

      <Box w="100%" h="50%" overflow="hidden">
        <Heading size="md">Following</Heading>

        <Flex
          {...followersFlex}
          {...(userInfo?.following?.length === 0
            ? { justifyContent: 'center', alignItems: 'center' }
            : {})}
        >
          {userInfo?.following?.length === 0
            ? 'You are not following anyone'
            : userInfo?.following?.map((_following) => (
                <Flex
                  {...followersWrapper}
                  onClick={() => handleOpenChat({ walletAddress: _following?.walletAddress })}
                  key={_following?.id}
                  _hover={{ cursor: 'pointer' }}
                >
                  <Text {...followerText}>{_following?.walletAddress}</Text>

                  <EmailIcon />
                </Flex>
              ))}
        </Flex>
      </Box>
    </>
  );
};

export default FollowersFollowing;
