import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { getAuctions, getMetals, createAuction, getHostingAuctions } from '@/lib/api/auctions';
import { AuctionParam } from '@/lib/api/types';

const useMetals = () => useQuery(['metals'], () => getMetals());
const useGetAuctions = () => useQuery(['auctions'], () => getAuctions({}));
const useCreateAuction = (options) =>
  useMutation((data: AuctionParam) => createAuction(data), options);

const useFetchInfiniteAuctions = () =>
  useInfiniteQuery(['getInfiniteAuctions'], ({ pageParam = 0 }) => getAuctions({ pageParam }), {
    getNextPageParam: (lastPage) => {
      if (!lastPage.last) {
        return lastPage.pageable.pageNumber + 1;
      }
    },
  });

const useFetchInfiniteHostingAuctions = () =>
  useInfiniteQuery(
    ['getInfiniteHotingAuctions'],
    ({ pageParam = 0 }) => getHostingAuctions({ pageParam }),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.last) {
          return lastPage.pageable.pageNumber + 1;
        }
      },
    },
  );

export {
  useMetals,
  useGetAuctions,
  useCreateAuction,
  useFetchInfiniteAuctions,
  useFetchInfiniteHostingAuctions,
};
