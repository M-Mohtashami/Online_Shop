import getAllCategoryService from '@/api/services/category/getAllCategoryService';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export const useGetCategories = (options: UseQueryOptions) => {
  return useQuery({
    ...options,
    queryKey: ['categories'],
    queryFn: () => getAllCategoryService(),
  });
};
