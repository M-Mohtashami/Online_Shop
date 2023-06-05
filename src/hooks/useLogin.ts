import { loginServices } from '@/api/services/loginServices';
import { LoginValues } from '@/interfaces/inretfaces';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { setCookie } from 'cookies-next';

const useLogin = (options: UseMutationOptions<any, any, any>) => {
  return useMutation({
    ...options,
    mutationKey: ['login'],
    mutationFn: (data: LoginValues) => loginServices(data),
    onSuccess(data: any) {
      if (data.status === 'success') {
        const token = data.token;
        setCookie('access_token', token.accessToken);
        setCookie('refresh_token', token.refreshToken);
        localStorage.setItem('user_info', JSON.stringify(data.data.user));
      }
    },
  });
};

export default useLogin;
