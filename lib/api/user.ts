import { defaultAxios } from '../defaultAxios';

export async function changePassword({ value1, value2 }: { value1: string; value2: string }) {
  const response = await defaultAxios.put('/user/password', {
    oldPassword: value1,
    newPassword: value2,
  });
  return response.data;
}

export async function findPassword({ value1, value2 }: { value1: string; value2: string }) {
  const response = await defaultAxios.put('/user/temp-password', {
    name: value1,
    email: value2,
  });
  return response.data;
}
