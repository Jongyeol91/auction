import { getNotification } from '@/lib/api/notification';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';

export const useGetNotification = (options: { enabled: boolean }) =>
  useQuery(['notificationResponse'], () => getNotification({}), options);

export const useFetchInfiniteNotifications = (options) =>
    useInfiniteQuery(
        ['getInfiniteNotifications' ],
        ({ pageParam = 0 }) => getNotification({ pageParam }),
        options,
    );
