import instance from '@/lib/instance';

const getAllCategoryService = async () => {
  try {
    const response = await instance.get('/categories');

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default getAllCategoryService;
