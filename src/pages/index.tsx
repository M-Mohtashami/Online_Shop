import getAllCategoryService from '@/api/services/category/getAllCategoryService';
import getAllSubCategoryService from '@/api/services/category/getAllSubCategoryService';
import { NextPageWithLayout } from '@/interfaces/inretfaces';
import MainLayout from '@/layout/MainLayout';
import { GetServerSideProps } from 'next';

const Home: NextPageWithLayout = () => {
  return <>home page</>;
};
export default Home;

Home.getLayout = function getLayout(page: React.ReactElement) {
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
