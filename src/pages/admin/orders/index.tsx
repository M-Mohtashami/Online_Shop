import { ReactElement, useState } from 'react';
import { Tab } from '@headlessui/react';
import { classNames } from '@/utils';
import { NextPageWithLayout } from '@/interfaces/inretfaces';
import AdminLayout from '@/layout/AdminLayout';
import ProductTable from '@/components/Products/Tables/ProductTable';
import PriceTable from '@/components/Products/Tables/PriceTable';
import type { GetServerSideProps } from 'next';

const Orders: NextPageWithLayout = () => {
  return (
    <div className="w-full px-2 py-2 sm:px-0 flex flex-col justify-start items-start">
      orders
    </div>
  );
};

Orders.getLayout = (page: ReactElement) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Orders;

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   console.log(query);

//   const products = await getAllProductsSevices(
//     query.category
//       ? `?page=${query.page || 1}&limit=${query.limit || 5}&sort=${
//           query.sort || ''
//         }&category=${query.category}`
//       : `?page=${query.page || 1}&limit=${query.limit || 5}&sort=${
//           query.sort || ''
//         }`
//   );
//   const categories = await getAllCategoryService();
//   const subcategories = await getAllSubCategoryService();

//   return {
//     props: {
//       products: products,
//       categoriesData: categories,
//       subcatecories: subcategories,
//     },
//   };
// };
