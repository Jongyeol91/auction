import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const getCookieToken = (name) => {
  return cookies.get(name);
};

export const setCookieToken = (name, value, options) => {
  return cookies.set(name, value, { ...options });
};

export const removeCookieToken = () => {
  return cookies.remove('refresh_token', { sameSite: 'strict', path: '/' });
};
