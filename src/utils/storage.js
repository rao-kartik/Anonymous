export const setCookie = (name, value, expiry) => {
  document.cookie = `${name}=${value},  path=/ ${expiry ? `,expires=${expiry}` : ''}`?.trim();
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=,  path=/`?.trim();
};

export const reacCookie = (name) => {
  const cookie = document.cookie
    .split(';')
    ?.find((_row) => _row?.trim()?.startsWith(`${name}=`))
    ?.split('=')?.[1]
    ?.split(',')?.[0]
    ?.trim();

  return cookie;
};
