import updatePriceService from '@/api/services/product/updatePriceService';
import { AddNewProductType, ProductPriceForm } from '@/interfaces/inretfaces';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

const useUpdatePrice = (
  options: UseMutationOptions<
    AddNewProductType['payload'],
    AddNewProductType['error'],
    AddNewProductType['response']
  >
) => {
  return useMutation({
    ...options,
    mutationKey: ['updatePrice'],
    mutationFn: (data: ProductPriceForm[]) => updatePriceService(data),
  });
};

export default useUpdatePrice;
