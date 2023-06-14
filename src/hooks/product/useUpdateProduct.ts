import updateProductService from '@/api/services/product/updateProductService';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useUpdateProduct = (options: UseMutationOptions) => {
  return useMutation({
    ...options,
    mutationKey: ['updateProduct'],
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      updateProductService(id, data),
  });
};
