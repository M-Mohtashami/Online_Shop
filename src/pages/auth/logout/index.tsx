import { logoutServices } from '@/api/services/logoutServices';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { routes } from '@/config/routes';

const Logout = () => {
  const router = useRouter();
  useEffect(() => {
    logoutServices();
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    Cookies.remove('user_role');
    localStorage.removeItem('user_info');
    router.push(routes.protected.Login);
  }, []);
  return <div>Redirecting...</div>;
};

export default Logout;
