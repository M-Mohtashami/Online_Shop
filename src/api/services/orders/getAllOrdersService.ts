import instance from '@/lib/instance';

const getAllOrdersService = async (query: string) => {
  try {
    const response = await instance.get('/orders' + query);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default getAllOrdersService;
