import MainFooter from '@/components/MainLayout/MainFooter';
import MainHeader from '@/components/MainLayout/MainHeader';
import { LayoutProps } from '@/interfaces/inretfaces';
import { ToastContainer } from 'react-toastify';
import React from 'react';

const MainLayout = ({ children }: LayoutProps) => {
  const { props } = children;

  return (
    <div className="max-w-[1440px] w-full h-full flex flex-col font-iran-sans">
      <MainHeader
        categories={props.categories}
        subcategories={props.subcategories}
      />
      <main className="flex-1 p-6">{children}</main>
      <MainFooter
        categories={props.categories}
        subcategories={props.subcategories}
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
};

export default MainLayout;
