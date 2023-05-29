import { NextPageWithLayout } from '@/interfaces/inretfaces';
import MainLayout from '@/layout/MainLayout';
import ProductLayout from '@/layout/ProductLayout';
import React, { ReactElement } from 'react';

const Products: NextPageWithLayout = () => {
  return <div>Products</div>;
};

export default Products;

Products.getLayout = (page: ReactElement) => {
  return (
    <MainLayout>
      <ProductLayout>{page}</ProductLayout>
    </MainLayout>
  );
};
