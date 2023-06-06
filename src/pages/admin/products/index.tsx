import { ReactElement, useState } from 'react';
import { Tab } from '@headlessui/react';
import { classNames } from '@/utils';
import { NextPageWithLayout } from '@/interfaces/inretfaces';
import AdminLayout from '@/layout/AdminLayout';

const Products: NextPageWithLayout = () => {
  let [categories] = useState(['محصولات', 'موجودی و قیمت‌ها']);

  return (
    <div className="w-full max-w-md px-2 py-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-links/50 p-1">
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
        <Tab.Panels className="mt-2">
          <Tab.Panel
            key={0}
            className={classNames(
              'rounded-xl bg-white p-3',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
            )}
          >
            {'products'}
          </Tab.Panel>
          <Tab.Panel
            key={1}
            className={classNames(
              'rounded-xl bg-white p-3',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
            )}
          >
            {'price and quantity'}
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
