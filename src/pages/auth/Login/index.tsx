import Button from '@/components/shared_components/Button';
import { LoginValues, NextPageWithLayout } from '@/interfaces/inretfaces';
import MainLayout from '@/layout/MainLayout';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useLogin from '@/hooks/useLogin';
import { useRouter } from 'next/router';

const schema = z.object({
  username: z.string().nonempty('نام کاربری نباید خالی باشد'),
  password: z.string().nonempty('رمز عبور نباید خالی باشد'),
});
const Login: NextPageWithLayout = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: zodResolver(schema),
  });
  const { mutate: loginMutate } = useLogin({});
  const onSubmit: SubmitHandler<LoginValues> = (data) => {
    loginMutate(data);
  };
  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-primary">
        <div className=" sm:mx-auto sm:w-full sm:max-w-md ">
          <div className="relative bg-white border border-gray-200 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="absolute -top-16 right-0 w-full flex justify-center">
              <img
                className="w-24"
                src="/assets/images/site_logo.png"
                alt="logo"
              />
            </div>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm font-medium">
                  {'نام کابری'}
                </label>
                <div className="mt-1">
                  <input
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
                <div className="mt-1">
                  <input
                    type="password"
                    {...register('password')}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <small className="text-red-500">
                  {errors.password?.message}
                </small>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-primary rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm">
                    {'مرا بخاطر بسپار'}
                  </label>
                </div>
              </div>

              <div>
                <Button
                  icon="forward"
                  type="submit"
                  variant="contained"
                  className="w-full bg-primary hover:bg-links"
                >
                  {'ورود'}
                </Button>
              </div>
            </form>
          </div>
          <div className="flex items-center justify-between">
            <Button
              type="button"
              icon="backward"
              variant="outlined"
              className="w-20 mt-3 border-secondery text-secondery"
              onClick={() => router.push('/')}
            >
              {'خانه'}
            </Button>
            <div>
              <span>{'کاربر تازه هستم: '}</span>
              <Link className="text-links font-semibold" href="/auth/register">
                {'ثبت نام'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

Login.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};
