import { NextPageWithLayout } from '@/interfaces/inretfaces';
import MainLayout from '@/layout/MainLayout';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';

const Auth: NextPageWithLayout = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/auth/login');
  }, []);
  return <div>Auth</div>;
};

export default Auth;

Auth.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};
