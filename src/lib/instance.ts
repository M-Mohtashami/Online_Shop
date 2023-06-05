import { baseURL } from '@/config/variable';
import axios from 'axios';
import { getCookie } from 'cookies-next';

const instance = axios.create({
  baseURL: baseURL,
});

export default instance;

instance.interceptors.request.use((config) => {
  console.log(config);
  if (config.url !== '/auth/login') {
    const accessToken = getCookie('access_token');
    config.headers.Authorization = accessToken;
  }
  return config;
});
