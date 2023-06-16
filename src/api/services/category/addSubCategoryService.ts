import type { SubCategoryType } from '@/interfaces/inretfaces';
import instance from '@/lib/instance';

const addSubCategoryService = async (data: {
  category: string;
  name: string;
}) => {
  try {
    const response = await instance.post('/subcategories', data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default addSubCategoryService;
