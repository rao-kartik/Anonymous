import { PATHS } from '../constants';

export const addressPrefix = 'eip155:';

export const triggerAlert = (type, msg) => {
  if (typeof window !== 'undefined') window.triggerToast(type, msg);
};

export const errorAlert = (err, redirect) => {
  const message =
    err?.response?.data?.message === 'jwt malformed'
      ? 'Invalid token'
      : err?.response?.data?.message || err?.message;

  triggerAlert('error', message);

  if (redirect && typeof window !== 'undefined') {
    window.location.href = PATHS.main;
  }
};

export const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
