import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';
import { Collapse } from '@chakra-ui/transition';
import { useDispatch, useSelector } from 'react-redux';

import { newPostThunk } from '../../../Containers/Home/asyncThunks';
import { REDUCERS } from '../../../constants';
import { setHomeReducer } from '../../../Containers/Home/homeSlice';
import { CircularProgress } from '@chakra-ui/progress';

const WritePost = () => {
  const dispatch = useDispatch();
  const { loader, posted } = useSelector((state) => state[REDUCERS.home]);

  const [postInp, setPostInp] = useState('');
  const [showPostBtn, setShowPostBtn] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    setPostInp(value);

    if (value?.length > 0 && !showPostBtn) {
      setShowPostBtn(true);
    } else if (value?.length === 0 && showPostBtn) {
      setShowPostBtn(false);
    }
  };

  const handleSubmitPost = () => {
    dispatch(newPostThunk({ post: postInp }));
  };

  useEffect(() => {
    if (posted) {
      handleChange({ target: { value: '' } });
      dispatch(setHomeReducer({ posted: null }));
    }
  }, [posted]);

  return (
    <Flex
      m={4}
      mt={0}
      p={4}
      bg="#fff"
      borderRadius={8}
      boxShadow="sm"
      direction="column"
      alignItems="flex-end"
    >
      <Input
        placeholder="What's on your mind?"
        borderRadius="20"
        onChange={handleChange}
        value={postInp}
      />

      <Collapse in={showPostBtn} animateOpacity>
        <Button
          w={20}
          cursor="pointer"
          bg="#e17055"
          color="#fff"
          mt={4}
          onClick={handleSubmitPost}
          disabled={postInp?.length === 0 || loader?.newPost}
        >
          {loader?.newPost ? (
            <CircularProgress isIndeterminate color="green.300" size={6} />
          ) : (
            'Post'
          )}
        </Button>
      </Collapse>
    </Flex>
  );
};

export default WritePost;
