'use-client';
import React, { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

const CommonToast = () => (WrappedComponent) => {
  const Comp = (props) => {
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

  Comp.displayName = `CommonToast(${getDisplayName(WrappedComponent)})`;

  return Comp;
};

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

export default CommonToast;
