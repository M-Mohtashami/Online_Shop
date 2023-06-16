import { IMAGES } from '@/config/variable';
import { ProductType } from '@/interfaces/inretfaces';
import React from 'react';

type Props = {
  product: ProductType;
};

const Card = ({ product }: Props) => {
  return (
    <div className="max-w-sm border border-slate-300 shadow-sm rounded-md col-span-3  p-6">
      <div className="w-full overflow-hidden">
        <img
          src={IMAGES + product.images[0]}
          alt={product.name}
          className="w-full aspect-square transition transform duration-500 ease-in-out hover:scale-110"
        />
      </div>
      {product.name}
    </div>
  );
};

export default Card;
