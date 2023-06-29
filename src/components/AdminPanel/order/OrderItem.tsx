import React, { useEffect, useState } from 'react';
import { CartItemType, ProductType } from '@/interfaces/inretfaces';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteProduct, updateProduct } from '@/redux/slice';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { IMAGES } from '@/config/variable';

type Props = {
  item: {
    _id: string;
    product: ProductType;
    count: number;
  };
};
const OrderItem = ({ item }: Props) => {
  return (
    <div className="w-full p-6 bg-white border border-gray-300 rounded-md flex flex-col items-center gap-6 sm:flex-row">
      <div className="w-16">
        <img
          src={IMAGES + item.product.images[0]}
          alt={item.product.name}
          className="aspect-square"
        />
      </div>
      <div className="w-full flex gap-6 justify-between">
        <div className="w-full flex flex-col items-center sm:items-start justify-between gap-3">
          <div className="flex flex-col items-start gap-3">
            <h3 className="text-sm">{item.product.name}</h3>
            <div className="w-full text-gray-400 text-xs flex items-center gap-3">
              <div>
                <span>{'قیمت واحد :'}</span>
              </div>
              <div>
                <span>
                  {Intl.NumberFormat('fa-IR').format(item.product.price)}
                </span>
                <span>{' تومان'}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-end gap-3">
          <div className="w-full text-xs border-gray-300 pb-3 text-primary flex items-start justify-start gap-3">
            <div>
              <span>{'قیمت :'}</span>
            </div>
            <div>
              <span>
                {Intl.NumberFormat('fa-IR').format(
                  item.count * item.product.price
                )}
              </span>
              <span>{' تومان'}</span>
            </div>
          </div>
          <div className="w-full text-xs border-gray-300 pb-3 text-primary flex items-start justify-start gap-3">
            <div>
              <span>{'تعداد :'}</span>
            </div>
            <div>
              <span>{Intl.NumberFormat('fa-IR').format(item.count)}</span>
              <span>{' عدد'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
