import { OrderType } from '@/interfaces/inretfaces';
import instance from '@/lib/instance';

const updateOrderServise = async (id: string, order: OrderType) => {
  try {
    const response = await instance.patch('/orders' + '/' + id, order);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default updateOrderServise;
