import getAllCategoryService from '@/api/services/category/getAllCategoryService';
import getAllSubCategoryService from '@/api/services/category/getAllSubCategoryService';
import CartItem from '@/components/Cart/CartItem';
import Button from '@/components/shared_components/Button';
import { NextPageWithLayout, RootState } from '@/interfaces/inretfaces';
import MainLayout from '@/layout/MainLayout';
import { GetServerSideProps } from 'next';
import React, { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Cart: NextPageWithLayout = () => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const price = cart.reduce((sum, item) => sum + item.productPrice, 0);
    setTotalPrice(price);
  }, [cart]);
  return (
    <div className="grid grid-cols-12 gap-3">
      <div className="col-span-12 md:col-span-8 lg:col-span-6 flex flex-col gap-3">
        {cart.map((item) => (
          <CartItem key={item.product._id} item={item} />
        ))}
      </div>
      <div className="h-72 p-6 col-span-12 md:col-span-4 lg:col-end-1 flex flex-col justify-between gap-3 bg-white rounded-md border border-gray-300 ">
        <div className="w-full border-gray-300  pb-3 text-primary flex items-center justify-between gap-3 border-b">
          <div>
            <span>{'قیمت نهایی :'}</span>
          </div>
          <div>
            <span>{Intl.NumberFormat('fa-IR').format(totalPrice)}</span>
            <span>{' تومان'}</span>
          </div>
        </div>
        <div>
          <Button
            type="button"
            variant="contained"
            iconClassName="w-5"
            className="w-full self-center sm:self-end justify-self-end bg-primary text-white hover:bg-links "
            onClick={() => {}}
          >
            {'نهایی کردن خرید'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

Cart.getLayout = (page: ReactElement) => {
  const { props } = page;

  return <MainLayout {...props} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const categories = await getAllCategoryService();
  const subCategories = await getAllSubCategoryService();
  // const newests = await getAllProductsSevices('?sort=-createdAt&limit=10');
  // const specials = await getAllProductsSevices('?sort=-quantity&limit=10');
  // const cheepests = await getAllProductsSevices('?sort=price&limit=10');
  // const populars = await getAllProductsSevices('?sort=-rating.rate&limit=10');

  return {
    props: {
      // products: {
      //   newests: newests.data.products,
      //   specials: specials.data.products,
      //   cheepests: cheepests.data.products,
      //   populars: populars.data.products,
      // },
      categories: categories,
      subcategories: subCategories,
    },
  };
};
