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

export async function getAuctions({ pageParam = 0, pageSize = 9, auctionType = 'NORMAL' }) {
  const res = await defaultAxios.get(`/auctions`, {
    params: {
      size: pageSize,
      page: pageParam,
      auctionType,
    },
  });
  return res.data.auctions;
}

export async function getHostingAuctions({ pageParam = 0, pageSize = 9 }) {
  const res = await defaultAxios.get(`/auctions/hosting`, {
    params: {
      size: pageSize,
      page: pageParam,
    },
  });
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
