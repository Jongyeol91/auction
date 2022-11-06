import { useQuery } from '@tanstack/react-query';
import { getPriceIndexCategory, getPriceIndexCategoryAll } from '@/lib/api/price-index';
import { AuctionParam } from '@/lib/api/types';

export const usePriceIndexCategoryAll = () =>
  useQuery(['priceIndexCategory'], () => getPriceIndexCategoryAll());

export const usePriceIndexCategory = () =>
  useQuery(['priceIndexCategoryAll'], (id) => getPriceIndexCategory(id));
