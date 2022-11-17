import { adminAxios } from '../adminAxios';
import { AuctionParam } from './types';

// export async function createAuction(params: createAuction) {
//   const res = await defaultAxios.post<CreateAuctionResponse>('/api/auction', params);
//   return res.data;
// }

export async function getMetals() {
  const res = await adminAxios.get('/metals');
  return res.data;
}

export async function createMetal(data: { metal: string }) {
  const res = await adminAxios.post('/metal', { name: data.metal });
  return res.data;
}
