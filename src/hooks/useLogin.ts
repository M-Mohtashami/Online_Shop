import { loginServices } from '@/api/services/loginServices';
import { LoginValues } from '@/interfaces/inretfaces';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

const useLogin = (options: UseMutationOptions<any, any, any>) => {
  return useMutation({
    ...options,
    // mutationKey: ['login'],
    mutationFn: (data: LoginValues) => loginServices(data),
  });
};

export default useLogin;
