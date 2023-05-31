import { NextPageWithLayout } from '@/interfaces/inretfaces';
import MainLayout from '@/layout/MainLayout';
import React, { ReactElement } from 'react';

const Cart: NextPageWithLayout = () => {
  return <div>Cart</div>;
};

export default Cart;

Cart.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};
