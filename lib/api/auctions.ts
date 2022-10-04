import { defaultAxios } from '../defaultAxios';
import { CreateAuctionResponse } from './types';

export async function createAuction(params: createAuction) {
  const res = await defaultAxios.post<CreateAuctionResponse>('/api/auction', params);
  return res.data;
}

interface createAuction {
  category: string;
  subCategory: string;
}
