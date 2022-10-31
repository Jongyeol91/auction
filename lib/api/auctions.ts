import { defaultAxios } from '../defaultAxios';
import { AuctionParam } from './types';

// export async function createAuction(params: createAuction) {
//   const res = await defaultAxios.post<CreateAuctionResponse>('/api/auction', params);
//   return res.data;
// }

export async function getMetals() {
  const res = await defaultAxios.get('/metals');
  return res.data;
}

export async function getAuctions() {
  const res = await defaultAxios.get('/auctions?page=1&size=9&auctionType=NORMAL');
  return res.data.auctions;
}

export async function createAuction(auction: AuctionParam) {
  const res = await defaultAxios.post('/auction', auction);
  return res.data;
}

interface createAuction {
  metal: string;
  metalOption: string;
}
