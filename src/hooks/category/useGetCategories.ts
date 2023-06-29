import getAllCategoryService from '@/api/services/category/getAllCategoryService';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

export const useGetCategories = (
  options: UseQueryOptions<any, unknown, unknown, QueryKey>
) => {
  return useQuery({
    ...options,
    // queryKey: ['categories'],
    queryFn: () => getAllCategoryService(),
  });
};
