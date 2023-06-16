import getAllCategoryService from '@/api/services/category/getAllCategoryService';
import getAllSubCategoryService from '@/api/services/category/getAllSubCategoryService';
import getAllProductsSevices from '@/api/services/product/getAllProductsServices';
import Card from '@/components/Products/Card';
import { NextPageWithLayout, ProductType } from '@/interfaces/inretfaces';
import MainLayout from '@/layout/MainLayout';
import { GetServerSideProps } from 'next';

type Props = {
  products: {
    status: string;
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: {
      products: ProductType[];
    };
  };
};
const Home: NextPageWithLayout = ({ products }: Props) => {
  const { products: productsData } = products?.data;

  return (
    <div className="grid grid-cols-12 gap-8">
      {productsData.map((product) => (
        <Card key={product._id} product={product} />
      ))}
    </div>
  );
};
export default Home;

Home.getLayout = function getLayout(page: React.ReactElement) {
  const { props } = page;

  return <MainLayout {...props} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const categories = await getAllCategoryService();
  const subCategories = await getAllSubCategoryService();
  const products = await getAllProductsSevices('');

  return {
    props: {
      products: products,
      categories: categories,
      subcategories: subCategories,
    },
  };
};
