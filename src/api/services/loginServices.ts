import instance from '@/lib/instance';
import type { LoginValues } from '@/interfaces/inretfaces';

export const loginServices = async (loginData: LoginValues) => {
  try {
    const response = await instance.post('/auth/login', loginData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
