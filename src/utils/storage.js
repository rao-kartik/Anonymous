export const setCookie = (name, value, expiry) => {
  document.cookie = `${name}=${value},  path=/ ${expiry ? `,expires=${expiry}` : ''}`?.trim();
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=,  path=/`?.trim();
};

export const readCookie = (name) => {
  const cookie = document.cookie
    .split(';')
    ?.find((_row) => _row?.trim()?.startsWith(`${name}=`))
    ?.split('=')?.[1]
    ?.split(', path')?.[0];

  return cookie;
};

export const setItemLS = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value));
};

export const getItemLS = (name) => {
  if (localStorage.getItem(name)) return JSON.parse(localStorage.getItem(name));
  return null;
};

export const deleteItemLS = (name, value) => {
  localStorage.removeItem(name, JSON.stringify(value));
};
