import getAllCategoryService from '@/api/services/category/getAllCategoryService';
import getAllSubCategoryService from '@/api/services/category/getAllSubCategoryService';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import Message from '@/components/checkout/Message';
import { routes } from '@/config/routes';
import { useSendOrder } from '@/hooks/order/useSendOrder';
import { NextPageWithLayout } from '@/interfaces/inretfaces';
import MainLayout from '@/layout/MainLayout';
import { deleteCart } from '@/redux/slice';
import { classNames } from '@/utils';
import { ExclamationIcon } from '@heroicons/react/outline';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ReactElement, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Payment: NextPageWithLayout = () => {
  const router = useRouter();
  const [order, setOrder] = useState(
    JSON.parse(localStorage.getItem('order')!)
  );
  const dispatch = useDispatch();

  const {
    mutate: sendOrder,
    isLoading,
    isSuccess,
  } = useSendOrder({
    onSuccess: (data) => {
      console.log(data);
      localStorage.removeItem('order');
      dispatch(deleteCart());
    },
  });

  useEffect(() => {
    if (router.query.status === 'success' && order) {
      sendOrder(order);
      isSuccess && localStorage.removeItem('order');
    }
  }, []);
  return (
    <>
      <div className="relative grid grid-cols-12">
        <div className="col-span-10 col-start-2 bg-gray-50 py-8 rounded-md">
          <div className="flex flex-col gap-6  items-center justify-start mb-4">
            <div
              className={classNames(
                router.query.status === 'success'
                  ? 'bg-green-100'
                  : 'bg-red-100 ',
                'mx-auto flex-shrink-0 flex items-center justify-center rounded-full p-4'
              )}
            >
              <ExclamationIcon
                className={classNames(
                  router.query.status === 'success' ? 'text-green-600' : 'text-red-600 ',
                  'h-36 w-36 '
                )}
              />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:mr-4 sm:text-right">
              <h3 className="text-lg leading-6 font-medium text-gray-900 truncate">
                {router.query.status === 'success'
                  ? 'عملیات پرداخت با موفقیت انجام شد'
                  : 'عملیات پرداخت با موفقیت انجام نشد'}
              </h3>
            </div>
          </div>
          <div className=" mt-5 sm:mt-4 sm:flex sm:justify-center w-full py-3 px-6">
            {router.query.status === 'success' ? (
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => {
                  router.push({
                    pathname: routes.public.Home,
                  });
                }}
              >
                {'بازگشت به خانه'}
              </button>
            ) : (
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => {
                  router.push({
                    pathname: routes.public.Checkout,
                  });
                }}
              >
                {'تلاش مجدد'}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;

Payment.getLayout = (page: ReactElement) => {
  const { props } = page;

  return <MainLayout {...props} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const categories = await getAllCategoryService();
  const subCategories = await getAllSubCategoryService();

  return {
    props: {
      categories: categories,
      subcategories: subCategories,
    },
  };
};
