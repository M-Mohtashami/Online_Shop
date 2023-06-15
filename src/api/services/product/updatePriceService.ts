import { ProductPriceForm } from '@/interfaces/inretfaces';
import instance from '@/lib/instance';

const updatePriceService = async (data: ProductPriceForm[]) => {
  try {
    const requests = data.map((request) =>
      instance
        .patch('/products/' + request.id, {
          price: request.price,
          quantity: request.quantity,
        })
        .then((res) => {
          return {
            status: 'success',
            data: res.data,
          };
        })
        .catch((res) => {
          return {
            status: 'fail',
            data: res.data,
          };
        })
    );
    return await Promise.all(requests);
  } catch (error) {
    console.log(error);
  }
};

export default updatePriceService;
