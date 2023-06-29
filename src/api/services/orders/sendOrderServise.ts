import { OrderType } from '@/interfaces/inretfaces';
import instance from '@/lib/instance';

const sendOrderServise = async (order: OrderType) => {
  try {
    const response = await instance.post('/orders', order);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default sendOrderServise;
