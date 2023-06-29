import updateOrderServise from '@/api/services/orders/updateOrderServise';
import { AddNewProductType, OrderType } from '@/interfaces/inretfaces';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useUpdateOrder = (
  options: UseMutationOptions<
    AddNewProductType['payload'],
    AddNewProductType['error'],
    AddNewProductType['response']
  >
) => {
  return useMutation({
    ...options,
    mutationKey: ['updateOrder'],
    mutationFn: ({ id, order }: { id: string; order: OrderType }) =>
      updateOrderServise(id, order),
  });
};
