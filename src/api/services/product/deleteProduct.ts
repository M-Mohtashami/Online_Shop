import instance from '@/lib/instance';
import { log } from 'console';

const deleteProductServices = async (id: string) => {
  try {
    const response = await instance.delete('/products/' + id);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default deleteProductServices;
