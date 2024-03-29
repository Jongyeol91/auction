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

export async function getAuctions({
  pageParam = 0,
  pageSize = 12,
  auctionType = '',
  sort,
  metalId,
}) {
  const res = await defaultAxios.get(`/auctions`, {
    params: {
      size: pageSize,
      page: pageParam,
      auctionType,
      sort,
      metalId,
    },
  });
  return res.data.auctions;
}

export async function getMyAuctions({ pageParam = 0, pageSize = 12, myAuctionType = 'hosting' }) {
  const res = await defaultAxios.get(`/auctions/${myAuctionType}`, {
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

export async function createAuctiomImage(image: File) {
  const res = await defaultAxios.post(
    '/auction/image',
    { image },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
}

export async function bid(bidData) {
  const res = await defaultAxios.post('/bid', bidData);
  return res.data;
}

interface createAuction {
  metal: string;
  metalOption: string;
}
