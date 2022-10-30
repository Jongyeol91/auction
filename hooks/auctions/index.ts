import { useMutation, useQuery } from '@tanstack/react-query';
import { getAuctions, getMetals, createAuction } from '@/lib/api/auctions';
import { AuctionParam } from '@/lib/api/types';

const useMetals = () => useQuery(['metals'], () => getMetals());
const useGetAuctions = () => useQuery(['auctions'], () => getAuctions());
const useCreateAuction = (options) =>
  useMutation((data: AuctionParam) => createAuction(data), options);
export { useMetals, useGetAuctions, useCreateAuction };