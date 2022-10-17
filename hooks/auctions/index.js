import { useQuery } from '@tanstack/react-query';
import { getMetals } from '@/lib/api/auctions';

const useMetals = () => {
  return useQuery(['metals'], () => getMetals());
};

export { useMetals };
