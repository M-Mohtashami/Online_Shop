import Button from '@/components/shared_components/Button';
import { routes } from '@/config/routes';
import { IMAGES } from '@/config/variable';
import { CartItemType, ProductType, RootState } from '@/interfaces/inretfaces';
import { addProduct } from '@/redux/slice';
import Link from 'next/link';
import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  product: ProductType;
  isLast?: boolean;
  newLimit?: () => void;
};

const Card = ({ product, isLast, newLimit }: Props) => {
  const cardRef = useRef(null);
  const dispatch = useDispatch();
  const { cart, totalprice } = useSelector((state: RootState) => state.cart);
  const [inCart, setInCart] = useState<CartItemType>();

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

  useEffect(() => {
    const findProduct = cart.find((item) => item.product._id === product._id);
    setInCart(findProduct);
  }, [cart]);

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
        <div className="px-5 space-y-5">
          <div className="w-full text-center truncate text-ellipsis">
            <h3>{product.name}</h3>
          </div>
          <div className="w-full text-center text-links ">
            <h3 className="text-xl">
              {Intl.NumberFormat('fa-IR').format(product.price) + ' تومان'}
            </h3>
          </div>
        </div>
      </Link>
      <div className="p-5">
        <Button
          icon="addtocart"
          type="button"
          variant="contained"
          iconClassName="w-5"
          className="w-full bg-primary text-white hover:bg-white hover:border hover:border-primary hover:text-primary"
          onClick={() => {
            if (inCart) {
              dispatch(
                addProduct({
                  product,
                  count: inCart.count < product.quantity ? 1 : 0,
                  productPrice: product.price,
                })
              );
            } else {
              dispatch(
                addProduct({ product, count: 1, productPrice: product.price })
              );
            }
          }}
        >
          {'افزودن به سبد خرید'}
        </Button>
      </div>
    </div>
  );
};

export default Card;
