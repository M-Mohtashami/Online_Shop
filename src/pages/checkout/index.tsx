import getAllCategoryService from '@/api/services/category/getAllCategoryService';
import getAllSubCategoryService from '@/api/services/category/getAllSubCategoryService';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import { NextPageWithLayout } from '@/interfaces/inretfaces';
import MainLayout from '@/layout/MainLayout';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';

const Checkout: NextPageWithLayout = () => {
  const router = useRouter();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user_info')!)
  );

  return (
    <div className="flex items-center justify-center mb-20">
      <CheckoutForm user={user} />
    </div>
  );
};

export default Checkout;

Checkout.getLayout = (page: ReactElement) => {
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
