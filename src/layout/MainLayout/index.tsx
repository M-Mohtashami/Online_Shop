import MainFooter from '@/components/MainLayout/MainFooter';
import MainHeader from '@/components/MainLayout/MainHeader';
import { LayoutProps } from '@/interfaces/inretfaces';
import React from 'react';

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div className="max-w-[1440px] w-full h-full flex flex-col">
      <MainHeader />
      <main className="flex-1 p-6">{children}</main>
      <MainFooter />
    </div>
  );
};

export default MainLayout;
