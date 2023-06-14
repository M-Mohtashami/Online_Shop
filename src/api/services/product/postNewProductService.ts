import instance from '@/lib/instance';

const postNewProductService = async (data: FormData) => {
  try {
    const response = await instance.post('/products', data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default postNewProductService;
