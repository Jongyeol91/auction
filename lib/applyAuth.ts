import { setDefaultAxiosCookie } from './defaultAxios';

export function applyAuth(request: Request) {
  const cookie = request.headers.get('Cookie');

  if (!cookie || !cookie.includes('token')) {
    return false;
  }

  setDefaultAxiosCookie(cookie);
  return true;
}
