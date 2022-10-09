import { defaultAxios } from '../defaultAxios';

interface AuthParam {
  userId: string;
  password: string;
}

export interface AuthResult {
  tokens: Tokens;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: number;
  username: string;
}

export async function register(params: AuthParam) {
  const res = await defaultAxios.post<AuthResult>('api/auth/register', params);
  const result = res.data;
  // ssr에서 필요
  // const cookieHeader = res.headers['set-cookie'];
  // const headers = createCookieHeaders(cookieHeader);

  return { result };
}

export async function login(params: AuthParam) {
  const res = await defaultAxios.post('/api/auth/login', params);
  const result = res.data;
  const status = res.status;
  console.log(res);

  const cookieHeader = res.headers['set-cookie'];
  const headers = createCookieHeaders(cookieHeader);
  console.log(headers);

  return { result, status };
}

export async function getMyAccount() {
  const res = await defaultAxios.get<AuthResult>('/api/me');
  return res.data;
}

function createCookieHeaders(setCookieHeader: string[] | undefined) {
  if (!setCookieHeader || setCookieHeader?.length === 0) {
    throw new Error('No cookie header');
  }
  const headers = new Headers();
  setCookieHeader.forEach((cookie) => {
    headers.append('Set-Cookie', cookie);
  });
  return headers;
}
