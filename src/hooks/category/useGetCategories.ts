import getAllCategoryService from '@/api/services/category/getAllCategoryService';
import {
  UseMutationOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';

export const useGetCategories = (options: UseMutationOptions) => {
  return useQuery({
    ...options,
    queryKey: ['categories'],
    queryFn: () => getAllCategoryService(),
  });
};
