import instance from '@/lib/instance';

const getAllUsersService = async () => {
  try {
    const response = await instance.get('/users?role=USER');
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default getAllUsersService;
