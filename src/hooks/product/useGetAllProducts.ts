import getAllProductsSevices from '@/api/services/product/getAllProductsServices';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export const useGetAllProducts = (options: UseQueryOptions, query: string) => {
  return useQuery({
    ...options,
    // queryKey: ['products', query],
    queryFn: () => getAllProductsSevices(query),
  });
};
