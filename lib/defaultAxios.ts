import axios from 'axios';

export const defaultAxios = axios.create();
const token = process.env.TEST_TOKEN;
defaultAxios.defaults.baseURL = 'http://localhost:3000/';
defaultAxios.defaults.withCredentials = true;
defaultAxios.defaults.headers.common['Authorizion'] = token;

export function setDefaultAxiosCookie(cookie: string) {
  defaultAxios.defaults.headers.common['Cookie'] = cookie;
}

export function clearDefaultAxiosCookie() {
  delete defaultAxios.defaults.headers.common['Cookie'];
}
