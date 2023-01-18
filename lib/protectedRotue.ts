import { getProfile } from './api/auth';
import Router from 'next/router';
import { setDefaultAxiosAuth } from './defaultAxios';

interface Props {
  redirectTo?: string;
}

export const checkIsLoggedIn = async ({ redirectTo }: Props = {}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  const applied = applyAuth();
  console.log('applied', applied);
  if (!applied) {
    if (redirectTo) {
      Router.replace(redirectTo);
    }

    return false;
  }
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
