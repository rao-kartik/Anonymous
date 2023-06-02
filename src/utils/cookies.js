const extractCookies = (cookieStr = '') => {
  const cookies = {};

  cookieStr.split(';').forEach((s) => {
    const [name, value] = s.trim().split('=');
    if (!name || !value) return;
    cookies[name.trim()] = value.trim();
  });

  return cookies;
};

module.exports = { extractCookies };
