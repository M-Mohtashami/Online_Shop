import { NextPageWithLayout } from '@/interfaces/inretfaces';
import MainLayout from '@/layout/MainLayout';
import React, { ReactElement } from 'react';

const Login: NextPageWithLayout = () => {
  return <div>Login</div>;
};

export default Login;

Login.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};
