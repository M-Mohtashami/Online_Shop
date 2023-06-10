import { logoutServices } from '@/api/services/logoutServices';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';

const cookie = new Cookies();
const Logout = () => {
  const router = useRouter();
  useEffect(() => {
    logoutServices();
    cookie.remove('access_token');
    cookie.remove('refresh_token');
    localStorage.removeItem('user_info');
    router.push('/');
  }, []);
  return <div>Logout</div>;
};

export default Logout;
