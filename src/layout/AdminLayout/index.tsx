import Header from '@/components/AdminLayout/Header';
import Sidebar from '@/components/AdminLayout/Sidebar';
import { LayoutProps } from '@/interfaces/inretfaces';
import React from 'react';

const AdminLayout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full h-full flex font-iran-sans">
      <Sidebar />
      <section className="w-full flex flex-col gap-3">
        <Header />
        <main className="p-2">{children}</main>
      </section>
    </div>
  );
};

export default AdminLayout;
