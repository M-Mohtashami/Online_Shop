import Button from '@/components/shared_components/Button';
import { IMAGES } from '@/config/variable';
import { ProductType } from '@/interfaces/inretfaces';
import React, { useRef } from 'react';

type Props = {
  product: ProductType;
};

const Card = ({ product }: Props) => {
  return (
    <div className="max-w-[17rem] border border-slate-300 shadow-sm rounded-md col-span-3 transition transform duration-500 ease-in-out hover:scale-110">
      <div className="w-full p-6 overflow-hidden flex items-center justify-center">
        <img
          src={IMAGES + product.images[0]}
          alt={product.name}
          className="w-full h-[50%] aspect-square"
        />
      </div>
      <div className="p-5 space-y-5">
        <div className="w-full text-center truncate text-ellipsis">
          <h3>{product.name}</h3>
        </div>
        <div className="w-full text-center text-links ">
          <h3>{Intl.NumberFormat('fa-IR').format(product.price) + ' تومان'}</h3>
        </div>
        <Button
          icon="addtocart"
          type="button"
          variant="contained"
          iconClassName="w-5"
          className="w-full bg-primary text-white hover:bg-white hover:border hover:border-primary hover:text-primary"
        >
          {'افزودن به سبد خرید'}
        </Button>
      </div>
    </div>
  );
};

export default Card;
