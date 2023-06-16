import addSubCategoryService from '@/api/services/category/addSubCategoryService';
import { AddNewProductType, SubCategoryType } from '@/interfaces/inretfaces';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useAddSubCategory = (
  options: UseMutationOptions<
    AddNewProductType['payload'],
    AddNewProductType['error'],
    AddNewProductType['response']
  >
) => {
  return useMutation({
    ...options,
    mutationKey: ['subCategory'],
    mutationFn: (data: { category: string; name: string }) =>
      addSubCategoryService(data),
  });
};
