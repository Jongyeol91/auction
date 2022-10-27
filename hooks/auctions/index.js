import { useQuery } from '@tanstack/react-query';
import { getAuctions, getMetals } from '@/lib/api/auctions';

const useMetals = () => useQuery(['metals'], () => getMetals());
const useGetAuctions = () => useQuery(['auctions'], () => getAuctions());
export { useMetals, useGetAuctions };
