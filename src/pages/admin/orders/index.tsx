import { ReactElement, useState } from 'react';
import { NextPageWithLayout } from '@/interfaces/inretfaces';
import AdminLayout from '@/layout/AdminLayout';
import type { GetServerSideProps } from 'next';
import getAllOrdersService from '@/api/services/orders/getAllOrdersService';
import OrdersTable from '@/components/orders/OrdersTable';

const Orders: NextPageWithLayout = ({ orders }) => {
  console.log(orders);

  return (
    <div className="w-full px-2 py-2 sm:px-0 flex flex-col justify-center items-center">
      <OrdersTable orders={orders} />
    </div>
  );
};

Orders.getLayout = (page: ReactElement) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Orders;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const filterQuery = query.deliveryStatus
    ? `?page=${query.page || 1}&limit=${query.limit || 4}&sort=${
        query.sort || '-createdAt'
      }&deliveryStatus=${query.deliveryStatus}`
    : `?page=${query.page || 1}&limit=${query.limit || 4}&sort=${
        query.sort || '-createdAt'
      }`;
  const orders = await getAllOrdersService(filterQuery);
  console.log(orders);

  return {
    props: {
      orders: orders,
    },
  };
};
