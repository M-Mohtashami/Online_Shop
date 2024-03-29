import instance from '@/lib/instance';

const getAllSubCategoryService = async () => {
  try {
    const response = await instance.get('/subcategories?limit=all');

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default getAllSubCategoryService;
