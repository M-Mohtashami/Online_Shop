import addCategoryService from '@/api/services/category/addCategoryService';
import { AddNewProductType } from '@/interfaces/inretfaces';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useAddCategory = (
  options: UseMutationOptions<
    AddNewProductType['payload'],
    AddNewProductType['error'],
    AddNewProductType['response']
  >
) => {
  return useMutation({
    ...options,
    mutationKey: ['category'],
    mutationFn: (data: FormData) => addCategoryService(data),
  });
};
