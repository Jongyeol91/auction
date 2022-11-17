import axios from 'axios';

export const adminAxios = axios.create();
const testToken = process.env.NEXT_PUBLIC_TEST_TOKEN;
const adminBaseURL = process.env.NEXT_PUBLIC_ADMIN_BASE_URL;
const localBaseURL = process.env.NEXT_LOCAL_BASE_URL;
const serviceKey = process.env.NEXT_PUBLIC_ADMINSERVICE_KEY;
const NODE_ENV = process.env.NODE_ENV;

adminAxios.defaults.baseURL = adminBaseURL;
adminAxios.defaults.withCredentials = true;
// defaultAxios.defaults.headers.common['Authorization'] = testToken;
adminAxios.defaults.headers.common['Service'] = serviceKey;

export function setDefaultAxiosAuth(token: string) {
  const tokenPrefix = 'Bearer';
  const space = ' ';
  adminAxios.defaults.headers.common['Authorization'] = tokenPrefix + space + token;
}

export function clearDefaultAxiosCookie() {
  delete adminAxios.defaults.headers.common['Cookie'];
}
