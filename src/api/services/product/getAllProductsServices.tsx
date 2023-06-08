import instance from '@/lib/instance';

const getAllProductsSevices = async (query: string) => {
  try {
    const response = await instance.get('/products' + query);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default getAllProductsSevices;
