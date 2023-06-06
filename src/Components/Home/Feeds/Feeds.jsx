import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';
import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/layout';

import {
  getAllPostsThunk,
  getAllPostsUserThunk,
  likeDislikeThunk,
} from '../../../Containers/Home/asyncThunks';
import { REDUCERS } from '../../../constants';
import { Button } from '@chakra-ui/button';

const Feeds = (props) => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state[REDUCERS.home]);

  const { isUserFeeds = false } = props;

  const handleLikeDislike = (postId, previousStatus) => {
    dispatch(likeDislikeThunk({ postId, status: previousStatus === false ? 'like' : 'dislike' }));
  };

  useEffect(() => {
    if (isUserFeeds) {
      dispatch(getAllPostsUserThunk());
    } else {
      dispatch(getAllPostsThunk());
    }
  }, []);

  return (
    <Flex p={4} pt={0} direction="column" alignItems="flex-end" gap={4}>
      {posts?.map((_item) => (
        <Box w="100%" p={4} pb={0} bg="#fff" borderRadius={8} boxShadow="sm" key={_item?._id}>
          <Box pb={2} mb={0.5} borderBottom="1px" borderColor="#dfe6e9">
            <Flex>
              <Grid
                w={8}
                h={8}
                bg="#fdcb6e"
                borderRadius="50%"
                placeItems="center"
                color="#ffffff"
                mr="2"
              >
                {_item?.postedBy?.userName?.[0] || _item?.postedBy?.walletAddress?.[2]}
              </Grid>

              <Box>
                <Heading size="xs" color="#2d3436">
                  {_item?.postedBy?.userName || _item?.postedBy?.walletAddress}
                </Heading>

                <Text fontSize="xs" color="#636e72">
                  {moment(_item.postedAt).format('DD MMM YYYY')} at {moment().format('h:mm A')}
                </Text>
              </Box>
            </Flex>

            <Text fontSize="md" color="#2d3436" mt={2}>
              {_item?.post || '-'}
            </Text>
          </Box>

          <Flex w="100%" position="relative" pb={2}>
            <Button
              w="calc(100% / 2)"
              h="fit-content"
              textAlign="center"
              px={2}
              py={1}
              mt={1}
              bg="none"
              _hover={{ bg: '#fab1a0', color: '#fff' }}
              borderRadius={8}
              cursor="pointer"
              fontSize="sm"
              color={_item?.userLiked ? '#ff7675' : '#636e72'}
              onClick={() => handleLikeDislike(_item._id, _item?.userLiked)}
            >
              Like ({_item?.totalLikes})
            </Button>
            <Button
              w="calc(100% / 2)"
              h="fit-content"
              textAlign="center"
              px={2}
              py={1}
              mt={1}
              bg="none"
              _hover={{ bg: '#fab1a0', color: '#fff' }}
              borderRadius={8}
              cursor="pointer"
              fontSize="sm"
              color="#636e72"
            >
              Comment ({_item?.totalComments})
            </Button>
          </Flex>
        </Box>
      ))}
    </Flex>
  );
};

export default memo(Feeds);
