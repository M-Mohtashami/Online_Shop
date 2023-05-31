import { NextPageWithLayout } from '@/interfaces/inretfaces';
import MainLayout from '@/layout/MainLayout';
import React, { ReactElement } from 'react';

const Register: NextPageWithLayout = () => {
  return <div>Register</div>;
};

export default Register;

Register.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};
