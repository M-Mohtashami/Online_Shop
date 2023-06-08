import { ReactElement, useState } from 'react';
import { NextPageWithLayout } from '@/interfaces/inretfaces';
import AdminLayout from '@/layout/AdminLayout';
import type { GetServerSideProps } from 'next';
import getAllUsersService from '@/api/services/users/getAllUsersService';
import instance from '@/lib/instance';
import { useAllUsers } from '@/hooks/user/useAllUsers';

const Orders: NextPageWithLayout = () => {
  const { data, isSuccess } = useAllUsers({});
  console.log(data);

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

// export const getServerSideProps: GetServerSideProps = async ({
//   query,
//   req,
// }) => {
//   instance.defaults.headers.common[
//     'Authorization'
//   ] = `Bearer ${req.cookies.access_token}`;
//   const users = await getAllUsersService();

//   return {
//     props: {
//       orders: users || null,
//     },
//   };
// };
