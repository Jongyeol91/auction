import { getNotification } from '@/lib/api/notification';
import { useQuery } from '@tanstack/react-query';

export const useGetNotification = (options: { enabled: boolean }) =>
  useQuery(['notifications'], () => getNotification({}), options);
