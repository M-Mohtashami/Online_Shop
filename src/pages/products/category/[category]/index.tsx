import getAllCategoryService from '@/api/services/category/getAllCategoryService';
import getAllSubCategoryService from '@/api/services/category/getAllSubCategoryService';
import getAllProductsSevices from '@/api/services/product/getAllProductsServices';
import Card from '@/components/Products/Card';
import { NextPageWithLayout, ProductType } from '@/interfaces/inretfaces';
import MainLayout from '@/layout/MainLayout';
import ProductLayout from '@/layout/ProductLayout';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

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

const Category: NextPageWithLayout = ({ products }: Props) => {
  console.log(products);

  const { page, per_page, total, total_pages, data } = products;
  const router = useRouter();
  return (
    <>
      <ProductLayout>
        <div className="grid grid-cols-12 gap-6 bg-white p-4 lg:col-span-3 place-items-center">
          {data.products.map((product: ProductType) => (
            <div
              key={product._id}
              className="col-span-12 md:col-span-6 xl:col-span-4"
            >
              <Card product={product} />
            </div>
          ))}
        </div>
      </ProductLayout>
    </>
  );
};

export default Category;

Category.getLayout = (page: ReactElement) => {
  const { props } = page;
  return <MainLayout {...props} />;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const categories = await getAllCategoryService();
  const subCategories = await getAllSubCategoryService();
  const products = await getAllProductsSevices(`?category=${query.category}`);

  return {
    props: {
      products: products,
      categories: categories,
      subcategories: subCategories,
    },
  };
};
