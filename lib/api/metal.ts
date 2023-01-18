import { defaultAxios } from '@/lib/defaultAxios';

export async function getMetals() {
  const res = await defaultAxios.get('/metals');
  return res.data;
}

export async function createMetal(data: { metal: string }) {
  const res = await defaultAxios.post('/metal', { name: data.metal });
  return res.data;
}

export async function createMetalOption(data: { metalId: number; name: string }) {
  const res = await defaultAxios.post('/metal/option', data);
  return res.data;
}
