import { ReactElement, useState } from 'react';
import { Tab } from '@headlessui/react';
import { classNames } from '@/utils';
import { NextPageWithLayout, ProductProps } from '@/interfaces/inretfaces';
import AdminLayout from '@/layout/AdminLayout';
import ProductTable from '@/components/AdminPanel/Tables/ProductTable';
import PriceTable from '@/components/AdminPanel/Tables/PriceTable';
import type { GetServerSideProps } from 'next';
import getAllProductsSevices from '@/api/services/product/getAllProductsServices';
import getAllCategoryService from '@/api/services/category/getAllCategoryService';
import { useRouter } from 'next/router';
import getAllSubCategoryService from '@/api/services/category/getAllSubCategoryService';
import { ProductDataContext } from '@/context';

const Products: NextPageWithLayout = ({
  products,
  categories,
  subcategories,
}: ProductProps) => {
  const router = useRouter();
  let [tabcategories] = useState(['محصولات', 'موجودی و قیمت‌ها']);
  const [currentTab, setCurrentTab] = useState(+router.query.tab! || 0);

  return (
    <ProductDataContext.Provider
      value={{
        products: products,
        categories: categories,
        subcategories: subcategories,
      }}
    >
      <div className="w-full px-2 py-2 sm:px-0 flex flex-col justify-start items-start">
        <Tab.Group
          defaultIndex={currentTab}
          onChange={(currentTab) => {
            setCurrentTab(currentTab);
            router.push({
              pathname: router.pathname,
              query: { tab: currentTab },
            });
          }}
        >
          <Tab.List className="w-full self-center max-w-md flex space-x-1 rounded-xl bg-links/50 p-1">
            {tabcategories.map((category, idx) => (
              <Tab
                key={category}
                className={() =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-primary',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    currentTab === idx
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
              {products.status === 'success' && <ProductTable />}
            </Tab.Panel>
            <Tab.Panel
              key={1}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              {/* {'price and quantity'} */}
              <PriceTable />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </ProductDataContext.Provider>
  );
};

Products.getLayout = (page: ReactElement) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Products;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  console.log(query);
  const page = query.page ? '?page=' + query.page : '?page=1';
  const limit = query.limit ? '&limit=' + query.limit : '&limit=5';
  const category = query.category ? '&category=' + query.category : '';
  const sort = query.sort ? '&sort=' + query.sort : '&sort=createdAt';

  const products = await getAllProductsSevices(page + limit + category + sort);
  const categories = await getAllCategoryService();
  const subcategories = await getAllSubCategoryService();

  return {
    props: {
      products: products,
      categories: categories,
      subcategories: subcategories,
    },
  };
};
