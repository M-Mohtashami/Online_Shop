import Button from '@/components/shared_components/Button';
import { classNames } from '@/utils';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon, XIcon } from '@heroicons/react/solid';
import {
  CartItemType,
  CategoryType,
  ProductFormType,
  ProductProps,
  ProductType,
  RootState,
  SubCategoryType,
  UserType,
} from '@/interfaces/inretfaces';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import dynamic from 'next/dynamic';
import { modules } from '@/utils/QuillToolbar';
import 'react-quill/dist/quill.snow.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

type Props = {
  user: UserType;
};

const initInfo = {
  firstname: '',
  lastname: '',
  phonenumber: '',
  address: '',
  deliveryDate: '',
};

const productSchema = z.object({
  firstname: z
    .string()
    .min(2, { message: 'نام باید بیشتر از 2 حرف باشد' })
    .nonempty({ message: 'لطفا نام را وارد کنید' }),
  lastname: z
    .string()
    .min(2, { message: 'نام خانوادگی باید بیشتر از 2 حرف باشد' })
    .nonempty({ message: 'لطفا نام خانوادگی را وارد کنید' }),
  address: z
    .string()
    .min(5, { message: 'آدرس باید بیشتر از 5 حرف باشد' })
    .nonempty({ message: 'لطفا آدرس را وارد کنید' }),
  deliveryDate: z.string().nonempty({ message: 'لطفا تاریخ را وارد کنید' }),
  phonenumber: z.string().nonempty({ message: 'لطفا شماره تماس را وارد کنید' }),
});

const CheckoutForm = ({ user }: Props) => {
  console.log(user);
  const { cart, totalprice } = useSelector((state: RootState) => state.cart);

  const router = useRouter();
  const [isUser, setIsUser] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    defaultValues: initInfo,
    resolver: zodResolver(productSchema),
  });

  const onSubmit = () => {
    const order = {
      user: user._id,
      products: cart.map((item: CartItemType) => {
        return {
          product: item.product._id,
          count: item.count,
        };
      }),
      deliveryDate: getValues().deliveryDate,
    };
    localStorage.setItem('order', JSON.stringify(order));
    router.push({
      pathname: 'http://localhost:3030',
      query: {
        user: user._id,
        price: totalprice,
      },
    });
  };

  useEffect(() => {
    if (user) {
      setIsUser(true);
      setValue('firstname', user.firstname);
      setValue('lastname', user.lastname);
      setValue('lastname', user.lastname);
      setValue('address', user.address);
      setValue('phonenumber', user.phoneNumber);
    }
  }, []);

  return (
    <div className="mt-8 text-right bg-white p-6 border border-gray-300 rounded-md md:justify-between max-w-lg">
      <div className="w-full py-4 text-primary text-xl border-b border-gray-300 flex items-center justify-center mb-5">
        <h1>{'فرم نهایی سازی سفارش'}</h1>
      </div>
      <form
        className="w-full flex flex-wrap gap-3 items-start justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* ورودی نام کاربر */}
        <div className="sm:w-52 w-full">
          <label className="block text-sm font-medium">{'نام '}</label>
          <div className="mt-1">
            <input
              type="text"
              disabled={isUser}
              {...register('firstname')}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:text-gray-500"
            />
          </div>

          <small className="text-red-500">
            {errors?.firstname?.message?.toString()}
          </small>
        </div>
        {/* ورودی نام خانوادگی کاربر */}
        <div className="sm:w-52 w-full">
          <label className="block text-sm font-medium">{'نام خانوادگی'}</label>
          <div className="mt-1">
            <input
              type="text"
              disabled={isUser}
              {...register('lastname')}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:text-gray-500"
            />
          </div>

          <small className="text-red-500">
            {errors?.lastname?.message?.toString()}
          </small>
        </div>
        {/* ورودی شماره تماس کالا */}
        <div className="sm:w-52 w-full">
          <label className="block text-sm font-medium">{'شماره تماس'}</label>
          <div className="mt-1">
            <input
              type="tel"
              disabled={isUser}
              {...register('phonenumber')}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:text-gray-500"
            />
          </div>

          <small className="text-red-500">
            {errors?.phonenumber?.message?.toString()}
          </small>
        </div>
        {/* ورودی  تاریخ کالا */}
        <div className="sm:w-52 w-full">
          <label className="block text-sm font-medium">{'تاریخ تحویل'}</label>
          <div className="mt-1">
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              {...register('deliveryDate')}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <small className="text-red-500">
            {errors?.deliveryDate?.message?.toString()}
          </small>
        </div>
        {/* ورودی آدرس کالا */}
        <div className="w-full">
          <label className="block text-sm font-medium">{'آدرس'}</label>
          <div className="mt-1">
            <textarea
              disabled={isUser}
              {...register('address')}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:text-gray-500"
            />
          </div>

          <small className="text-red-500">
            {errors?.address?.message?.toString()}
          </small>
        </div>

        <div className="sm:w-52 w-full self-end mt-5">
          <Button
            type="submit"
            variant="contained"
            className="w-full bg-primary hover:bg-links"
          >
            {'پرداخت'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
