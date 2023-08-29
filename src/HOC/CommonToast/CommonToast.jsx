import React, { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

export default () => (WrappedComponent) => (props) => {
  const toast = useToast();

  const triggerToast = (
    status = 'success',
    title = '',
    duration = 2000,
    position = 'top-right'
  ) => {
    toast({
      title,
      status,
      duration,
      isClosable: true,
      position,
    });
  };

  useEffect(() => {
    window.triggerToast = triggerToast;
  }, []);

  return <WrappedComponent {...props} />;
};
