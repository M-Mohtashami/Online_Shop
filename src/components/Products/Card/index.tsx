import Button from '@/components/shared_components/Button';
import { routes } from '@/config/routes';
import { IMAGES } from '@/config/variable';
import { ProductType } from '@/interfaces/inretfaces';
import Link from 'next/link';
import React, { useRef, useEffect } from 'react';

type Props = {
  product: ProductType;
  isLast?: boolean;
  newLimit?: () => void;
};

const Card = ({ product, isLast, newLimit }: Props) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting && newLimit) {
        newLimit();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(cardRef.current);
  }, [isLast]);

  return (
    <div
      ref={cardRef}
      className="max-w-[17rem] shadow-sm border border-gray-100 hover:shadow-md rounded-md col-span-3 bg-white"
    >
      <Link
        href={{
          pathname: routes.public.SingleProduct,
          query: { name: product.name },
        }}
      >
        <div className="flex p-6 items-center justify-center">
          <img
            src={IMAGES + product.images[0]}
            alt={product.name}
            className=""
          />
        </div>
        <div className="px-5 pb-5 space-y-5">
          <div className="w-full text-center truncate text-ellipsis">
            <h3>{product.name}</h3>
          </div>
          <div className="w-full text-center text-links ">
            <h3 className="text-xl">
              {Intl.NumberFormat('fa-IR').format(product.price) + ' تومان'}
            </h3>
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
      </Link>
    </div>
  );
};

export default Card;
