import postNewProductService from '@/api/services/product/postNewProductService';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useAddProduct = (options: UseMutationOptions) => {
  return useMutation({
    ...options,
    mutationKey: ['postProduct'],
    mutationFn: (data: FormData) => postNewProductService(data),
  });
};
