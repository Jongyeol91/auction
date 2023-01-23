import { defaultAxios } from '../defaultAxios';

export async function getNotification({ pageParam = 0, pageSize = 10 }) {
  const res = await defaultAxios.get('/notification', {
    params: {
      size: pageSize,
      page: pageParam,
    },
  });
  return res.data;
}
