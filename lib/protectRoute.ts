import { type AuthResult, getMyAccount, refreshToken } from './api/auth';
import { applyAuth } from './applyAuth';
import { setDefaultAxiosCookie, withCookie } from './defaultAxios';
import { extractError } from './error';

const promiseMap = new Map<
  Request,
  Promise<{
    me: AuthResult;
    headers: Headers | null;
    accessToken?: string;
  }>
>();

export async function getMemoMyAccount(request: Request) {
  const promise = promiseMap.get(request);
  return promise.finally(() => promiseMap.delete(request));
}

export const checkIsLoggedIn = async () => {
  const applied = applyAuth();
  if (!applied) return false;
  try {
    await withCookie(() => getMemoMyAccount(request), request, true);
  } catch (e) {
    return false;
  }

  return true;
};
