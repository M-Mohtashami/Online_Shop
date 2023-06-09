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
    onSuccess(data: any) {
      console.log(data);

      if (data.status === 'success') {
        const token = data.token;
        cookie.set('access_token', token.accessToken);
        cookie.set('refresh_token', token.refreshToken);
        localStorage.setItem('user_info', JSON.stringify(data.data.user));

        // toast.success('ورود موفق', {
        //   position: 'top-right',
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: 'light',
        // });
      } else if (data.status === 'fail') {
        // toast.error(' نام کاربری یا رمزعبور نادرست است', {
        //   position: 'top-right',
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: 'light',
        // });
      }
    },
  });
};

export default useLogin;
