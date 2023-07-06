import Button from '@/components/shared_components/Button';
import { NextPageWithLayout, RegisterValues } from '@/interfaces/inretfaces';
import MainLayout from '@/layout/MainLayout';
import Link from 'next/link';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useRegister from '@/hooks/useRegister';
import { useRouter } from 'next/router';
import { routes } from '@/config/routes';
import getAllCategoryService from '@/api/services/category/getAllCategoryService';
import getAllSubCategoryService from '@/api/services/category/getAllSubCategoryService';
import { GetServerSideProps } from 'next';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

const schema = z.object({
  firstname: z.string().nonempty('لطفا نام را وارد کنید'),
  lastname: z.string().nonempty('لطفا نام خانوادگی را وارد کنید'),
  phoneNumber: z
    .string()
    .nonempty('لطفا شماره تماس را وارد کنید')
    .regex(
      new RegExp(/09[0-9][0-9]-?[0-9]{3}-?[0-9]{4}/),
      'لطفا یک شماره تماس معتبر وارد کنید'
    ),
  address: z.string().nonempty('لطفا آدرس را وارد کنید'),
  username: z.string().nonempty('لطفا نام کاربری را وارد کنید'),
  password: z
    .string()
    .nonempty('لطفا رمز عبور را وارد کنید')
    .regex(
      new RegExp(/^[a-z0-9]{8,16}$/),
      'رمز عبور باید شامل حرف انگلیسی و عدد باشد'
    ),
});

const Register: NextPageWithLayout = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      phoneNumber: '',
      address: '',
      username: '',
      password: '',
    },
    resolver: zodResolver(schema),
  });

  // const { cart } = useSelector((state: RootState) => state.cart);
  const { mutate: registerMutate, isSuccess } = useRegister({
    onSuccess(data: any) {
      if (data.status === 'success') {
        toast.success('ثبت نام موفقیت آمیز بود');
        router.push(routes.protected.Login);
      } else if (data.status === 'fail') {
        switch (data.message) {
          case `ValidationError: \"password"\ length must be at least 8 characters long`:
            setError('password', {
              message: 'رمز عبور باید بیشتر از 8 کاراکتر باشد',
            });
            break;
          default:
            setError('root', {
              message: 'در فرایند ثبت نام خطایی رخ داد لطفا مجدد تلاش کنید',
            });
        }
      }
    },
  });
  const onSubmit: SubmitHandler<RegisterValues> = (data) => {
    registerMutate(data);
    // reset();
  };

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-primary">
        <div className=" sm:mx-auto sm:w-full sm:max-w-md ">
          <div className="relative bg-white border border-gray-200 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="absolute -top-16 right-0 w-full flex justify-center">
              <Image
                width={96}
                height={96}
                src="/assets/images/site_logo.png"
                alt="logo"
              />
            </div>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* ورودی نام کاربر */}
              <div className=" w-full mt-4">
                <label className="block text-sm font-medium">{'نام '}</label>
                <div className="mt-1">
                  <input
                    type="text"
                    {...register('firstname')}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:text-gray-500"
                  />
                </div>

                <small className="text-red-500">
                  {errors?.firstname?.message?.toString()}
                </small>
              </div>
              {/* ورودی نام خانوادگی کاربر */}
              <div className=" w-full">
                <label className="block text-sm font-medium">
                  {'نام خانوادگی'}
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    {...register('lastname')}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:text-gray-500"
                  />
                </div>

                <small className="text-red-500">
                  {errors?.lastname?.message?.toString()}
                </small>
              </div>
              {/* ورودی شماره تماس کالا */}
              <div className=" w-full">
                <label className="block text-sm font-medium">
                  {'شماره تماس'}
                </label>
                <div className="mt-1">
                  <input
                    type="tel"
                    {...register('phoneNumber')}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:text-gray-500"
                  />
                </div>

                <small className="text-red-500">
                  {errors?.phoneNumber?.message?.toString()}
                </small>
              </div>
              {/* ورودی آدرس کالا */}
              <div className="w-full">
                <label className="block text-sm font-medium">{'آدرس'}</label>
                <div className="mt-1">
                  <textarea
                    {...register('address')}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:text-gray-500"
                  />
                </div>

                <small className="text-red-500">
                  {errors?.address?.message?.toString()}
                </small>
              </div>
              <div>
                <label className="block text-sm font-medium">
                  {'نام کابری'}
                </label>
                <div className="mt-1">
                  <input
                    onClick={() => clearErrors('root')}
                    type="text"
                    {...register('username')}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <small className="text-red-500">
                  {errors.username?.message}
                </small>
              </div>
              <div>
                <label className="block text-sm font-medium">
                  {'رمز عبور'}
                </label>
                <div className="relative mt-1">
                  <input
                    onClick={() => clearErrors('root')}
                    type={isVisible ? 'text' : 'password'}
                    {...register('password')}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <div
                    onClick={() => setIsVisible((prev) => !prev)}
                    className="absolute left-3 bottom-3"
                  >
                    {isVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </div>
                </div>
                <small className="text-red-500">
                  {errors.password?.message}
                </small>
              </div>

              <div>
                <Button
                  icon="forward"
                  type="submit"
                  variant="contained"
                  className="w-full bg-primary hover:bg-links"
                >
                  {'ثبت نام'}
                </Button>
              </div>
              {errors.root && (
                <div className="text-red-500 w-full p-3 bg-red-500/20">
                  <small>{errors.root?.message}</small>
                </div>
              )}
            </form>
          </div>
          <div className="flex items-center justify-between">
            <Button
              type="button"
              icon="backward"
              variant="outlined"
              className="w-20 mt-3 border-secondery text-secondery"
              onClick={() => router.push(routes.public.Home)}
            >
              {'خانه'}
            </Button>
            <div>
              <span>{'قبلا ثبت نام کرده‌اید: '}</span>
              <Link
                className="text-links font-semibold"
                href={routes.protected.Login}
              >
                {'ورود'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

Register.getLayout = (page: ReactElement) => {
  const { props } = page;

  return <MainLayout {...props} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const categories = await getAllCategoryService();
  const subCategories = await getAllSubCategoryService();

  return {
    props: {
      categories: categories,
      subcategories: subCategories,
    },
  };
};
