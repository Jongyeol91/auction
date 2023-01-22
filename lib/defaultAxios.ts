import axios from 'axios';

export const defaultAxios = axios.create();
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

defaultAxios.defaults.baseURL = baseURL;
defaultAxios.defaults.withCredentials = true;

export function setDefaultAxiosAuth(token: string) {
  const tokenPrefix = 'Bearer';
  const space = ' ';
  defaultAxios.defaults.headers.common['Authorization'] = tokenPrefix + space + token;
}

export function clearDefaultAxiosCookie() {
  delete defaultAxios.defaults.headers.common['Cookie'];
}
