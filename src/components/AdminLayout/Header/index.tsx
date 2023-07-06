import React from 'react';
import { MenuAlt2Icon } from '@heroicons/react/outline';
import Link from 'next/link';
import { icons } from '@/config/variable';
import { FaSignOutAlt } from 'react-icons/fa';
import { routes } from '@/config/routes';
import Cookies from 'js-cookie';
import { logoutServices } from '@/api/services/logoutServices';

const Header = ({ sidebarOpen }: { sidebarOpen: (val: boolean) => void }) => {
  return (
    <>
      {' '}
      <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
        <button
          type="button"
          className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
          onClick={() => sidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 px-4 flex justify-between">
          <div className="w-full flex items-center justify-end md:ml-2">
            <Link
              href="#"
              className="ml-4 hidden md:inline-flex items-center justify-center p-2 font-normal text-base text-links hover:text-primary"
            >
              {'محصول جدید'}
            </Link>
            <Link
              href="#"
              className="ml-4 hidden md:inline-flex items-center justify-center p-2 font-normal text-base text-links hover:text-primary"
            >
              {'دسته‌بندی جدید'}
            </Link>
            <Link
              onClick={() => {
                logoutServices();
                Cookies.remove('access_token');
                Cookies.remove('refresh_token');
                Cookies.remove('user_role');
                localStorage.removeItem('user_info');
              }}
              href={routes.public.Home}
              className="ml-4 inline-flex items-center justify-center p-2 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-primary hover:bg-links"
            >
              <FaSignOutAlt className="rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
