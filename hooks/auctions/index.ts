import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { getAuctions, getMetals, createAuction, getMyAuctions } from '@/lib/api/auctions';
import { AuctionParam, AuctionType } from '@/lib/api/types';

const useMetals = (options?: { enabled: boolean }) =>
  useQuery(['metals'], () => getMetals(), options);

const useGetAuctions = () => useQuery(['auctions'], () => getAuctions({}));

const useCreateAuction = (options) =>
  useMutation((data: AuctionParam) => createAuction(data), options);

const useFetchInfiniteAuctions = (auctionType: AuctionType, sort: string, metalId: number) =>
  useInfiniteQuery(
    ['getInfiniteAuctions', auctionType, sort, metalId],
    ({ pageParam = 0 }) => getAuctions({ pageParam, auctionType, sort, metalId }),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.last) {
          return lastPage.pageable.pageNumber + 1;
        }
      },
    },
  );

const useFetchInfiniteMyAuctions = (myAuctionType = 'hosting', options) =>
  useInfiniteQuery(
    ['getInfiniteHotingAuctions', myAuctionType],
    ({ pageParam = 0 }) => getMyAuctions({ pageParam, myAuctionType }),
    options,
  );

export {
  useMetals,
  useGetAuctions,
  useCreateAuction,
  useFetchInfiniteAuctions,
  useFetchInfiniteMyAuctions,
};
