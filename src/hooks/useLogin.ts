import { loginServices } from '@/api/services/loginServices';
import { LoginValues } from '@/interfaces/inretfaces';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import Cookies from 'universal-cookie';

const cookie = new Cookies();
const useLogin = (options: UseMutationOptions<any, any, any>) => {
  return useMutation({
    ...options,
    mutationKey: ['login'],
    mutationFn: (data: LoginValues) => loginServices(data),
    onSuccess(data: any) {
      if (data.status === 'success') {
        const token = data.token;
        cookie.set('access_token', token.accessToken);
        cookie.set('refresh_token', token.refreshToken);
        localStorage.setItem('user_info', JSON.stringify(data.data.user));
      }
    },
  });
};

export default useLogin;
