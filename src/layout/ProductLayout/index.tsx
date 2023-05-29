import Filter from '@/components/Products/Filter';
import SideFilter from '@/components/Products/SideFilter';
import { LayoutProps } from '@/interfaces/inretfaces';
import React from 'react';

const ProductLayout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full h-full flex">
      <SideFilter />
      <section className="w-full flex flex-col gap-3">
        <Filter />
        <main className="p-2">{children}</main>
      </section>
    </div>
  );
};

export default ProductLayout;
