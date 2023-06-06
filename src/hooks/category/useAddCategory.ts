import addCategoryService from '@/api/services/category/addCategoryService';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useAddCategory = (options: UseMutationOptions) => {
  return useMutation({
    ...options,
    mutationKey: ['category'],
    mutationFn: (data: FormData) => addCategoryService(data),
  });
};
