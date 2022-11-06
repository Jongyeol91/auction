import { defaultAxios } from '../defaultAxios';

interface AuthParam {
  userId: string;
  password: string;
}

interface RegisterParam {
  business: {
    businessType: string;
    businessName: string;
    representative: string;
    registrationNumber: string;
    licenceImageUrl: string;
  };
  personal: {
    name: string;
    email: string;
    password: string;
  };
  account: {
    bank: string;
    accountNumber: string;
    accountHolder: string;
  };
  isEnabled: string;
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

export async function register(params: RegisterParam) {
  const res = await defaultAxios.post('/user', params);
  const result = res.data;
  // ssr에서 필요
  // const cookieHeader = res.headers['set-cookie'];
  // const headers = createCookieHeaders(cookieHeader);

  return { result };
}

export async function login(params: AuthParam) {
  const res = await defaultAxios.post('/user/token', params);
  const result = res.data;
  const status = res.status;

  // const cookieHeader = res.headers['set-cookie'];
  // const headers = createCookieHeaders(cookieHeader);

  return { result, status };
}

export async function getMyAccount() {
  const res = await defaultAxios.get<AuthResult>('/me');
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

export async function getProfile() {
  const res = await defaultAxios.get('user/profile');
  return res.data;
}
