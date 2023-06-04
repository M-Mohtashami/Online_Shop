import Button from '@/components/shared_components/Button';
import TextField from '@/components/shared_components/TextField';
import { NextPageWithLayout } from '@/interfaces/inretfaces';
import MainLayout from '@/layout/MainLayout';
import Link from 'next/link';
import React, { ReactElement } from 'react';

const Login: NextPageWithLayout = () => {
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
            <form className="space-y-6">
              <TextField label="نام کابری" name="username" type="text" />
              <TextField label="رمز عبور" name="password" type="password" />

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
