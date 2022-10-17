import { defaultAxios } from '../defaultAxios';
import { CreateAuctionResponse } from './types';

export async function createAuction(params: createAuction) {
  const res = await defaultAxios.post<CreateAuctionResponse>('/api/auction', params);
  return res.data;
}

export async function getMetals() {
  const res = await defaultAxios.get('/api/auction/metals');
  console.log(res.data);

  return res.data;
}

interface createAuction {
  metal: string;
  metalOption: string;
}
