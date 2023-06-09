import { loginServices } from '@/api/services/loginServices';
import { LoginValues } from '@/interfaces/inretfaces';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';

const cookie = new Cookies();
const useLogin = (options: UseMutationOptions<any, any, any>) => {
  return useMutation({
    ...options,
    mutationKey: ['login'],
    mutationFn: (data: LoginValues) => loginServices(data),
  });
};

export default useLogin;
