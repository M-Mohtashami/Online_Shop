import { NextPageWithLayout } from '@/interfaces/inretfaces';
import MainLayout from '@/layout/MainLayout';
import React, { ReactElement } from 'react';

const SingleProduct: NextPageWithLayout = () => {
  return <div>SingleProduct</div>;
};

export default SingleProduct;

SingleProduct.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};
