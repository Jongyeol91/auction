import axios from 'axios';

export const defaultAxios = axios.create();
defaultAxios.defaults.baseURL = 'http://localhost:3000';
defaultAxios.defaults.withCredentials = true;

export function setDefaultAxiosCookie(cookie: string) {
  defaultAxios.defaults.headers.common['Cookie'] = cookie;
}
