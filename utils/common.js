import { ROUTES } from "./routes";

export const addressPrefix = 'eip155:';

export const triggerAlert = (type, msg) => {
  if (typeof window !== 'undefined') window.triggerToast(type, msg);
};

export const errorAlert = (err, redirect) => {
  const message =
    err?.response?.data?.message === 'jwt malformed'
      ? 'Invalid token'
      : err?.response?.data?.message === 'jwt expired'
      ? 'Session Expired'
      : err?.response?.data?.message || err?.message;

  triggerAlert('error', message);

  if (redirect && typeof window !== 'undefined') {
    window.location.href = ROUTES?.main;
  }
};

export const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
