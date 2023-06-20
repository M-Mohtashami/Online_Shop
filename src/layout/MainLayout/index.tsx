import MainFooter from '@/components/MainLayout/MainFooter';
import MainHeader from '@/components/MainLayout/MainHeader';
import { LayoutProps } from '@/interfaces/inretfaces';
import React from 'react';

type Props = {
  children: React.ReactElement;
};

const MainLayout = ({ children }: Props) => {
  const { props } = children;

  return (
    <div className="max-w-[1440px] w-full h-full flex flex-col font-iran-sans ">
      <MainHeader
        categories={props.categories}
        subcategories={props.subcategories}
      />
      <main className="flex-1 p-6 w-full ">{children}</main>
      <MainFooter
        categories={props.categories}
        subcategories={props.subcategories}
      />
    </div>
  );
};

export default MainLayout;
