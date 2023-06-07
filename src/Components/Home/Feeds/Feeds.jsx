import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';
import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/layout';

import {
  deletePostThunk,
  getAllCommentsThunk,
  getAllPostsThunk,
  getAllPostsUserThunk,
  likeDislikeThunk,
} from '../../../Containers/Home/asyncThunks';
import { REDUCERS } from '../../../constants';
import { Button } from '@chakra-ui/button';
import { DeleteIcon } from '@chakra-ui/icons';
import { Collapse } from '@chakra-ui/transition';
import Comments from './Comments/Comments';

const Feeds = (props) => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state[REDUCERS.home]);
  const { userInfo } = useSelector((state) => state[REDUCERS.common]);

  const { isUserFeeds = false } = props;

  const [showComments, setShowComments] = useState(null);

  const handleLikeDislike = (postId, previousStatus) => {
    dispatch(likeDislikeThunk({ postId, status: previousStatus === false ? 'like' : 'dislike' }));
  };

  const handleShowComments = (postId) => {
    if (postId === showComments) {
      setShowComments(null);
    } else {
      setShowComments(postId);
      dispatch(getAllCommentsThunk(postId));
    }
  };

  const handleDeletePost = (postId) => {
    dispatch(deletePostThunk(postId));
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
          <Box pb={2} mb={0.5} borderBottom="1px" borderColor="#dfe6e9" position="relative">
            {_item?.postedBy?.id === userInfo?.id && (
              <Button
                position="absolute"
                top={0}
                right={-3}
                width="14px"
                height="14px"
                bg="none"
                p={0}
                _hover={{ bg: 'none' }}
                onClick={() => handleDeletePost(_item?._id)}
              >
                <DeleteIcon w="100%" h="100%" />
              </Button>
            )}
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
              onClick={() => handleShowComments(_item?._id)}
            >
              Comment ({_item?.totalComments})
            </Button>
          </Flex>

          <Collapse in={showComments === _item?._id}>
            <Comments postId={showComments} />
          </Collapse>
        </Box>
      ))}
    </Flex>
  );
};

export default memo(Feeds);
