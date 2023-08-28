import React, { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (WrappedComponent) => {
  return (props) => {
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <WrappedComponent {...props} />;
  };
};
