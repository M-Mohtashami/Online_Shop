import { NextPageWithLayout } from '@/interfaces/inretfaces';
import MainLayout from '@/layout/MainLayout';
import React, { ReactElement } from 'react';

const FOF: NextPageWithLayout = () => {
  return <div>404</div>;
};

export default FOF;

FOF.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};
