import { defaultAxios, setDefaultAxiosAuth } from '../defaultAxios';
import { getStroageItem } from '../local-storage';

interface AuthParam {
  email: string;
  password: string;
}

interface Business {
  businessType: string;
  businessName: string;
  representative: string;
  registrationNumber: string;
  licenceImageUrl: string;
}

interface Personal {
  name: string;
  email: string;
  password: string;
}

interface Account {
  bank: string;
  accountNumber: string;
  accountHolder: string;
}
interface RegisterParam {
  business: Business;
  personal: Personal;
  account: Account;
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
export interface ModifyUserParam {
  business: Business;
  personalUpdateCommand: {
    name: string;
  };
  accountUpdateCommand: Account;
}

export async function register(params: RegisterParam) {
  const res = await defaultAxios.post('/user', params);
  const result = res.data;
  // ssr에서 필요
  // const cookieHeader = res.headers['set-cookie'];
  // const headers = createCookieHeaders(cookieHeader);

  return { result };
}

export async function modifyUser(params: ModifyUserParam) {
  const res = await defaultAxios.put(`/user/${params.id}`, params.data);
  const result = res.data;

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
  const token = await getStroageItem('accessToken');
  if (token) {
    await setDefaultAxiosAuth(token);
    const res = await defaultAxios.get('user/profile');
    return res.data;
  }
  return null;
}
