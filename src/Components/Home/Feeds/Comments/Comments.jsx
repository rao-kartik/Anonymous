import React, { useState } from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import { useDispatch, useSelector } from 'react-redux';
import { REDUCERS } from '../../../../constants';
import { Textarea } from '@chakra-ui/textarea';
import { Button } from '@chakra-ui/button';
import { newCommentThunk } from '../../../../Containers/Home/asyncThunks';

const Comments = (props) => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state[REDUCERS.home]);
  const { userInfo } = useSelector((state) => state[REDUCERS.common]);

  const { postId } = props;

  const [commentInput, setCommentInput] = useState('');

  const handleCommentInputChange = (e) => {
    const { value } = e.target;

    setCommentInput(value);
  };

  const handlePostComment = () => {
    dispatch(newCommentThunk({ id: postId, data: { comment: commentInput } }));
    setCommentInput('');
  };

  return (
    <Box w="100%" minH="100px" h="fit-content" pb={4}>
      {comments?.length === 0 ? (
        <Flex w="100%" h={20} justifyContent="center" alignItems="center">
          No Comments
        </Flex>
      ) : (
        <Flex overflowY="auto" direction="column" gap={4} maxH="240px" className="hide-scrollbar">
          {comments?.map((_comment) => (
            <Box bg="#dfe6e966" borderRadius={12} p={4} key={_comment?._id}>
              <Heading size="xs">
                {_comment?.commentedBy?.walletAddress === userInfo?.walletAddress
                  ? 'Self'
                  : _comment?.commentedBy?.userName || _comment?.commentedBy?.walletAddress}
              </Heading>
              <Text size="xs" mt={2}>
                {_comment?.comment}
              </Text>
            </Box>
          ))}
        </Flex>
      )}
      <Flex w="100%" pt={4} position="relative" direction="column" alignItems="flex-end" bg="#fff">
        <Textarea
          bg="#dfe6e966"
          border="none"
          _focusVisible={{
            borderWidth: 0,
          }}
          borderRadius={12}
          fontSize="sm"
          placeholder="Write a Comment..."
          onChange={handleCommentInputChange}
          value={commentInput}
        />

        <Button
          bg="#fab1a0"
          color="#fff"
          width="fit-content"
          mt={4}
          disabled={commentInput?.length === 0}
          onClick={handlePostComment}
        >
          Post
        </Button>
      </Flex>
    </Box>
  );
};

export default Comments;
