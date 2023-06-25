import getAllCategoryService from '@/api/services/category/getAllCategoryService';
import getAllSubCategoryService from '@/api/services/category/getAllSubCategoryService';
import getAllProductsSevices from '@/api/services/product/getAllProductsServices';
import Card from '@/components/Products/Card';
import { FilterContext } from '@/context';
import {
  NextPageWithLayout,
  ProductType,
  SubCategoryType,
} from '@/interfaces/inretfaces';
import MainLayout from '@/layout/MainLayout';
import ProductLayout from '@/layout/ProductLayout';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';

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
  filteredSubCategory: SubCategoryType[];
};

const Category: NextPageWithLayout = ({
  products,
  filteredSubCategory,
}: Props) => {
  console.log(filteredSubCategory);

  const { page, per_page, total, total_pages, data } = products;
  const [nextPage, setNextPage] = useState(1);
  const router = useRouter();
  useEffect(() => {
    router.replace(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          page: nextPage,
        },
      },
      undefined,
      { scroll: false }
    );
  }, [nextPage]);
  return (
    <>
      <FilterContext.Provider value={{ subcategories: filteredSubCategory }}>
        <ProductLayout>
          <div className="grid grid-cols-12 gap-6  p-4 lg:col-span-3 place-items-center bg-white">
            {data.products.map((product: ProductType, index) => (
              <div
                key={product._id}
                className="col-span-12 md:col-span-6 xl:col-span-4"
              >
                <Card
                  product={product}
                  isLast={index === data.products.length - 1}
                  newLimit={() =>
                    setNextPage(page + 1 < total_pages ? page + 1 : total_pages)
                  }
                />
              </div>
            ))}
          </div>
        </ProductLayout>
      </FilterContext.Provider>
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
  const products = await getAllProductsSevices(
    `?category=${query.category}${
      query.subcategory ? '&subcategory=' + query.subcategory + '&' : '&'
    }${query.quantity ? 'quantity[gte]=' + query.quantity + '&' : '&'}sort=${
      query.sort || '-rating.rate'
    }`
  );

  const filteredSubCategory = subCategories.data.subcategories.filter(
    (sub: SubCategoryType) => sub.category === query.category
  );

  return {
    props: {
      products: products,
      categories: categories,
      subcategories: subCategories,
      filteredSubCategory: filteredSubCategory,
    },
  };
};
