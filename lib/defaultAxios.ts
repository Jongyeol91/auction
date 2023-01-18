import axios from 'axios';

export const defaultAxios = axios.create();
const testToken = process.env.NEXT_PUBLIC_TEST_TOKEN;
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const localBaseURL = process.env.NEXT_LOCAL_BASE_URL;
const serviceKey = process.env.NEXT_PUBLIC_SERVICE_KEY;
const NODE_ENV = process.env.NODE_ENV;

defaultAxios.defaults.baseURL = baseURL;
defaultAxios.defaults.withCredentials = true;
// defaultAxios.defaults.headers.common['Authorization'] = testToken;
defaultAxios.defaults.headers.common['Service'] = serviceKey;

export function setDefaultAxiosAuth(token: string) {
  const tokenPrefix = 'Bearer';
  const space = ' ';
  defaultAxios.defaults.headers.common['Authorization'] = tokenPrefix + space + token;
}

export function clearDefaultAxiosCookie() {
  delete defaultAxios.defaults.headers.common['Cookie'];
}
