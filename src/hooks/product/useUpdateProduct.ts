import updateProductService from '@/api/services/product/updateProductService';
import { AddNewProductType } from '@/interfaces/inretfaces';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useUpdateProduct = (
  options: UseMutationOptions<
    AddNewProductType['payload'],
    AddNewProductType['error'],
    AddNewProductType['response']
  >
) => {
  return useMutation({
    ...options,
    mutationKey: ['updateProduct'],
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      updateProductService(id, data),
  });
};
