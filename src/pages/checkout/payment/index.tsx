import getAllCategoryService from '@/api/services/category/getAllCategoryService';
import getAllSubCategoryService from '@/api/services/category/getAllSubCategoryService';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import Message from '@/components/checkout/Message';
import { useSendOrder } from '@/hooks/order/useSendOrder';
import { NextPageWithLayout } from '@/interfaces/inretfaces';
import MainLayout from '@/layout/MainLayout';
import { deleteCart } from '@/redux/slice';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ReactElement, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Payment: NextPageWithLayout = () => {
  const router = useRouter();
  const [order, setOrder] = useState(
    JSON.parse(localStorage.getItem('order')!)
  );
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  const { mutate: sendOrder, isLoading } = useSendOrder({
    onSuccess: (data) => {
      console.log(data);
      localStorage.removeItem('order');
      dispatch(deleteCart());
    },
  });

  useEffect(() => {
    if (router.query.status === 'success' && order && !isLoading) {
      sendOrder(order);
    }
  }, []);
  return (
    <div className="flex items-center justify-center mb-20">
      <Message
        status={router.query.status as string}
        open={open}
        closeModal={() => setOpen(false)}
      />
    </div>
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
