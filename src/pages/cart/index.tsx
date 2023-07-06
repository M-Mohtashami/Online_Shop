import getAllCategoryService from '@/api/services/category/getAllCategoryService';
import getAllSubCategoryService from '@/api/services/category/getAllSubCategoryService';
import CartItem from '@/components/Cart/CartItem';
import Button from '@/components/shared_components/Button';
import { routes } from '@/config/routes';
import { NextPageWithLayout, RootState } from '@/interfaces/inretfaces';
import MainLayout from '@/layout/MainLayout';
import { deleteCart } from '@/redux/slice';
import { ExclamationIcon } from '@heroicons/react/outline';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Cart: NextPageWithLayout = () => {
  const { cart, totalprice } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <>
      {totalprice && totalprice > 0 ? (
        <div className="relative grid grid-cols-12 gap-3 lg:gap-6">
          <div className="col-span-12 md:col-span-8 lg:col-span-6 lg:col-start-2 flex flex-col gap-3">
            {cart.map((item) => (
              <CartItem key={item.product._id} item={item} />
            ))}
          </div>
          <div className="md:max-w-sm h-72 p-6 col-span-12 md:col-span-4 flex flex-col justify-between gap-3 bg-white rounded-md border border-gray-300 ">
            <div className="w-full border-gray-300  pb-3 text-primary flex items-center justify-between gap-3 border-b">
              <div>
                <span>{'قیمت نهایی :'}</span>
              </div>
              <div>
                {totalprice && (
                  <span>{Intl.NumberFormat('fa-IR').format(totalprice)}</span>
                )}
                <span>{' تومان'}</span>
              </div>
            </div>
            <div>
              <Button
                type="button"
                variant="contained"
                iconClassName="w-5"
                className="w-full self-center sm:self-end justify-self-end bg-primary text-white hover:bg-links "
                onClick={() => {
                  router.push({
                    pathname: routes.public.Checkout,
                    query: {
                      ...router.query,
                      checkout: 'pending',
                    },
                  });
                }}
              >
                {'نهایی کردن خرید'}
              </Button>
              <Button
                type="button"
                variant="contained"
                iconClassName="w-5"
                className="w-full mt-3 self-center sm:self-end justify-self-end bg-red-600 text-white hover:bg-red-400 "
                onClick={() => {
                  dispatch(deleteCart());
                }}
              >
                {'پاک کردن سبد خرید'}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative grid grid-cols-12">
          <div className="col-span-10 col-start-2 bg-gray-50 pb-16 rounded-md">
            <div
              className={
                'mx-auto flex-shrink-0 flex items-center justify-center rounded-full p-4'
              }
            >
              <ExclamationIcon
                className={'h-36 w-36 text-links '}
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:mr-4 sm:text-right">
              <h3 className="text-lg text-center text-links leading-6 font-medium  truncate">
                {'سبد خرید خالی می باشد'}
              </h3>
            </div>
          </div>
        </div>
      )}
    </>
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
