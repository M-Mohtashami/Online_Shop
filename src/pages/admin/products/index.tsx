import { ReactElement, useState } from 'react';
import { Tab } from '@headlessui/react';
import { classNames } from '@/utils';
import { NextPageWithLayout } from '@/interfaces/inretfaces';
import AdminLayout from '@/layout/AdminLayout';
import ProductTable from '@/components/Products/Tables/ProductTable';
import PriceTable from '@/components/Products/Tables/PriceTable';
import type { GetServerSideProps } from 'next';
import getAllProductsSevices from '@/api/services/product/getAllProductsServices';
import getAllCategoryService from '@/api/services/category/getAllCategoryService';
import getAllSubCategoryService from '@/api/services/category/getAllSubCategoryService';

const Products: NextPageWithLayout = ({ products, categoriesData }) => {
  let [categories] = useState(['محصولات', 'موجودی و قیمت‌ها']);

  return (
    <div className="w-full px-2 py-2 sm:px-0 flex flex-col justify-start items-start">
      <Tab.Group>
        <Tab.List className="w-full self-center max-w-md flex space-x-1 rounded-xl bg-links/50 p-1">
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-primary',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-links hover:bg-white/[0.12] hover:text-secondery'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="w-full mt-2">
          <Tab.Panel
            key={0}
            className={classNames(
              'rounded-xl bg-white p-3',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
            )}
          >
            {/* product tabel */}
            {products.status === 'success' && (
              <ProductTable
                products={products}
                categories={categoriesData.data.categories}
              />
            )}
          </Tab.Panel>
          <Tab.Panel
            key={1}
            className={classNames(
              'rounded-xl bg-white p-3',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
            )}
          >
            {/* {'price and quantity'} */}
            <PriceTable products={products} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

Products.getLayout = (page: ReactElement) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Products;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  console.log(query);

  const products = await getAllProductsSevices(
    query.category
      ? `?page=${query.page || 1}&limit=${query.limit || 5}&sort=${
          query.sort || ''
        }&category=${query.category}`
      : `?page=${query.page || 1}&limit=${query.limit || 5}&sort=${
          query.sort || ''
        }`
  );
  const categories = await getAllCategoryService();

  return {
    props: {
      products: products,
      categoriesData: categories,
    },
  };
};