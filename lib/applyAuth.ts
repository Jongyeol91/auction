import { setDefaultAxiosAuth } from './defaultAxios';

export function applyAuth() {
  const token = localStorage.getItem('Authorization');

  if (!token) {
    return false;
  }

  setDefaultAxiosAuth(token);
  return true;
}
