import { userAtom } from '@/store';
import { useAtom } from 'jotai';
import { getProfile } from './api/auth';
import Router from 'next/router';
import { setDefaultAxiosAuth } from './defaultAxios';

export const checkIsLoggedIn = async () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const applied = applyAuth();
  console.log('applied', applied);
  if (!applied) return false;
  try {
    const user = await getProfile();
    if (!user) {
      Router.replace('/login');
      return false;
    }
    return user;
  } catch (e) {
    return false;
  }
};

function applyAuth() {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      return false;
    }

    setDefaultAxiosAuth(token);
    return true;
  }
}
