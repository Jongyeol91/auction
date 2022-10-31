import axios from 'axios';

export const defaultAxios = axios.create();
const testToken = process.env.NEXT_PUBLIC_TEST_TOKEN;
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const serviceKey = process.env.NEXT_PUBLIC_SERVICE_KEY;

defaultAxios.defaults.baseURL = baseURL;
defaultAxios.defaults.withCredentials = true;
defaultAxios.defaults.headers.common['Authorization'] = testToken;
defaultAxios.defaults.headers.common['Service'] = serviceKey;

export function setDefaultAxiosCookie(cookie: string) {
  defaultAxios.defaults.headers.common['Cookie'] = cookie;
}

export function clearDefaultAxiosCookie() {
  delete defaultAxios.defaults.headers.common['Cookie'];
}
