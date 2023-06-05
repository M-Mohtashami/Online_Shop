import instance from '@/lib/instance';

const addCategoryService = async (data: FormData) => {
  try {
    const response = await instance({
      method: 'POST',
      url: '/categories',
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default addCategoryService;
