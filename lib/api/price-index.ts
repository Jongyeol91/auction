import { QueryFunctionContext } from '@tanstack/react-query';
import { defaultAxios } from '../defaultAxios';

export async function getPriceIndexCategoryAll() {
  const res = await defaultAxios.get('/price-index-category');
  return res.data;
}

export async function getPriceIndexCategory(id: string | number | QueryFunctionContext<string[]>) {
  const res = await defaultAxios.get(`/price-index-category/${id}/values`);
  return res.data;
}
