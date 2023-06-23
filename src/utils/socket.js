import { createSocketConnection } from '@pushprotocol/socket';

export const ENV = 'dev';

export const connectToSocket = (user, key, socketType = 'notification') => {
  const pushSDKSocket = createSocketConnection({
    user,
    socketType,
    socketOptions: { autoConnect: true, reconnectionAttempts: 3 },
    env: ENV,
  });

  return pushSDKSocket;
};
