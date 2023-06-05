import instance from '@/lib/instance';

export const logoutServices = async () => {
  try {
    const response = await instance.get('/auth/logout');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
