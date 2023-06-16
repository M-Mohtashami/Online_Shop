import postNewProductService from '@/api/services/product/postNewProductService';
import { AddNewProductType } from '@/interfaces/inretfaces';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useAddProduct = (
  options: UseMutationOptions<
    AddNewProductType['payload'],
    AddNewProductType['error'],
    AddNewProductType['response']
  >
) => {
  return useMutation({
    ...options,
    mutationKey: ['postProduct'],
    mutationFn: (data: FormData) => postNewProductService(data),
  });
};
