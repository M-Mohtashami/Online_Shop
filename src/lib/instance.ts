import { baseURL } from '@/config/variable';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookie = new Cookies();
const instance = axios.create({
  baseURL: baseURL,
});

export default instance;

instance.interceptors.request.use((config) => {
  console.log(config);
  if (config.url !== '/auth/token') {
    const accessToken = cookie.get('access_token');
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
        const refreshToken = cookie.get('refresh_token');
        instance.post('/auth/token', { refreshToken }).then((res) => {
          const accessToken = res.data.token.accessToken;
          cookie.set('access_token', accessToken);
          // cookie.set("refreshToken", res.data.refreshToken);
          config.headers.Authorization = 'Bearer ' + accessToken;
          return instance(config);
        });
      } else if (config.url === '/auth/token') {
        cookie.remove('access_token');
        cookie.remove('refresh_token');
        localStorage.removeItem('user_info');
        location.href = '/auth/login';
      }
    }
  }
);