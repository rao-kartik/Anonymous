export const addressPrefix = 'eip155:';

export const customisedErrMessage = (err) =>
  err?.response?.data?.message === 'jwt malformed' ? 'Invalid token' : err?.response?.data?.message;

export const triggerAlert = (type, msg) => {
  if (typeof window !== 'undefined') window.triggerToast(type, msg);
};
