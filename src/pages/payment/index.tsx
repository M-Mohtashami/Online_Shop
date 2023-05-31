import { NextPageWithLayout } from '@/interfaces/inretfaces';
import MainLayout from '@/layout/MainLayout';
import React, { ReactElement } from 'react';

const Payment: NextPageWithLayout = () => {
  return <div>Payment</div>;
};

export default Payment;

Payment.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};
