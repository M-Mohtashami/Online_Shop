import { routes } from '@/config/routes';
import { baseURL } from '@/config/variable';
import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  baseURL: baseURL,
});

export default instance;

instance.interceptors.request.use((config) => {
  console.log(config);
  if (config.url !== '/auth/token') {
    const accessToken = Cookies.get('access_token');
    config.headers.Authorization = 'Bearer ' + accessToken;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },

  // 401

  (error) => {
    const config = error.config;
    // console.log("config", config);
    if (error.response.status === 401 && !config.sent) {
      config.sent = true;
      if (config.url !== '/auth/token' && config.url !== '/auth/login') {
        const refreshToken = Cookies.get('refresh_token');
        instance.post('/auth/token', { refreshToken }).then((res) => {
          console.log(res);
          if (res.status === 200) {
            const accessToken = res.data.token.accessToken;
            Cookies.set('access_token', accessToken);
            // cookie.set("refreshToken", res.data.refreshToken);
            config.headers.Authorization = 'Bearer ' + accessToken;
            return instance(config);
          } else {
            Cookies.remove('access_token');
            Cookies.remove('refresh_token');
            Cookies.remove('user_role');
            localStorage.removeItem('user_info');
            location.href = routes.protected.Login;
          }
        });
      } else if (config.url === '/auth/token' && config.url !== '/auth/login') {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        Cookies.remove('user_role');
        localStorage.removeItem('user_info');
        location.href = routes.protected.Login;
      }
    }
    return error.response;
  }
);
