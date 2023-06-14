import instance from '@/lib/instance';

const updateProductService = async (id: string, data: FormData) => {
  try {
    const response = await instance.patch('/products/' + id, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default updateProductService;
