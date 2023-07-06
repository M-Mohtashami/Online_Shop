import { logoutServices } from '@/api/services/logoutServices';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

const Logout = () => {
  const router = useRouter();
  useEffect(() => {
    logoutServices();
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    Cookies.remove('user_role');
    localStorage.removeItem('user_info');
    router.push('/');
  }, []);
  return <div>Redirecting...</div>;
};

export default Logout;
