import sendOrderServise from '@/api/services/orders/sendOrderServise';
import { AddNewProductType, OrderType } from '@/interfaces/inretfaces';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useSendOrder = (
  options: UseMutationOptions<
    AddNewProductType['payload'],
    AddNewProductType['error'],
    AddNewProductType['response']
  >
) => {
  return useMutation({
    ...options,
    mutationKey: ['postOrder'],
    mutationFn: (data: OrderType) => sendOrderServise(data),
  });
};
