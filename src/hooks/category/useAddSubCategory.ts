import addSubCategoryService from '@/api/services/category/addSubCategoryService';
import { SubCategoryType } from '@/interfaces/inretfaces';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useAddSubCategory = (options: UseMutationOptions) => {
  return useMutation({
    ...options,
    mutationKey: ['subCategory'],
    mutationFn: (data: SubCategoryType) => addSubCategoryService(data),
  });
};
