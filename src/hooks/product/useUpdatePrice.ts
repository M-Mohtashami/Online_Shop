import updatePriceService from '@/api/services/product/updatePriceService';
import { ProductPriceForm } from '@/interfaces/inretfaces';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

const useUpdatePrice = (options: UseMutationOptions) => {
  return useMutation({
    ...options,
    mutationKey: 'updatePrice',
    mutationFn: (data: ProductPriceForm[]) => updatePriceService(data),
  });
};

export default useUpdatePrice;
