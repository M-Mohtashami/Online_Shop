import instance from '@/lib/instance';
import type { RegisterValues } from '@/interfaces/inretfaces';

export const registerServices = async (registerData: RegisterValues) => {
  try {
    const response = await instance.post('/auth/signup', registerData);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
