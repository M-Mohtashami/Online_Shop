import React, { useEffect, useState } from 'react';
import { IMAGES, thumbnails } from './../../config/variable/index';
import { CartItemType } from '@/interfaces/inretfaces';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteProduct, updateProduct } from '@/redux/slice';
import Button from '../shared_components/Button';
import Link from 'next/link';
import { routes } from '@/config/routes';

type Props = {
  item: CartItemType;
};
const CartItem = ({ item }: Props) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.count);

  useEffect(() => {
    dispatch(
      updateProduct({
        ...item,
        count: quantity,
      })
    );
  }, [quantity]);

  return (
    <div className="w-full p-6 bg-white border border-gray-300 rounded-md flex flex-col items-center gap-6 sm:flex-row">
      <Link
        className="w-28"
        href={{
          pathname: routes.public.SingleProduct,
          query: {
            name: item.product.name,
          },
        }}
      >
        <img
          src={IMAGES + item.product.images[0]}
          alt={item.product.name}
          className="aspect-square"
        />
      </Link>
      <div className="w-full flex flex-col sm:flex-row sm:justify-between">
        <div className="w-full flex flex-col items-center sm:items-start justify-between gap-3">
          <Link
            href={{
              pathname: routes.public.SingleProduct,
              query: {
                name: item.product.name,
              },
            }}
            className="flex flex-col items-start gap-3"
          >
            <h3>{item.product.name}</h3>
            <span className="text-links text-xs">
              {item.product.category.name + '/' + item.product.subcategory.name}
            </span>
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
          </Link>
          <div>
            <input
              type="number"
              //   max={item.product.quantity}
              min={1}
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  +e.target.value < item.product.quantity
                    ? +e.target.value
                    : item.product.quantity
                )
              }
              className="w-16 p-2 bg-gray-100 rounded-sm text-md shadow-sm text-center focus:border focus:border-primary"
            />
          </div>
        </div>
        <div className="w-full flex flex-col justify-between">
          <div className="w-full border-gray-300 pb-3 text-primary flex items-center justify-center sm:justify-end gap-3">
            <div>
              <span>{'قیمت :'}</span>
            </div>
            <div>
              <span>
                {Intl.NumberFormat('fa-IR').format(item.productPrice)}
              </span>
              <span>{' تومان'}</span>
            </div>
          </div>
          <Button
            icon="deletefromcart"
            type="button"
            variant="contained"
            iconClassName="w-5"
            className="w-40 self-center sm:self-end justify-self-end bg-red-500 text-white hover:bg-white hover:border hover:border-red-600 hover:text-red-600"
            onClick={() => {
              dispatch(deleteProduct(item));
            }}
          >
            {'حذف '}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
