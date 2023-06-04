import { NextPageWithLayout } from '@/interfaces/inretfaces';
import AdminLayout from '@/layout/AdminLayout';
import { ReactElement } from 'react';

const AdminPanel: NextPageWithLayout = () => {
  return <div></div>;
};

AdminPanel.getLayout = (page: ReactElement) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminPanel;
