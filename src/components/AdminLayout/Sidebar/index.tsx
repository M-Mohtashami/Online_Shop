import { classNames } from '@/utils';
import React, { useState } from 'react';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  XIcon,
} from '@heroicons/react/outline';
import { BsArrowRight } from 'react-icons/bs';
import Link from 'next/link';
import { routes } from '@/config/routes';
import Cookies from 'js-cookie';
import { logoutServices } from '@/api/services/logoutServices';
import { useRouter } from 'next/router';
import Image from 'next/image';

const navigation = [
  {
    name: 'داشبورد',
    href: routes.private.Admin,
    icon: HomeIcon,
  },
  { name: 'پروفایل', href: '#', icon: UsersIcon },
  {
    name: 'محصولات',
    href: routes.private.Product,
    icon: FolderIcon,
  },
  {
    name: 'دسته‌بندی',
    href: routes.private.Categories,
    icon: CalendarIcon,
  },
  {
    name: 'سفارشات',
    href: routes.private.Payment,
    icon: InboxIcon,
  },
  {
    name: 'خروج',
    href: 'logout',
    icon: BsArrowRight,
  },
];

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (val: boolean) => void;
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(router.pathname);
  return (
    <>
      {' '}
      <div className="relative">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-50 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-links bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-32 pb-4 bg-primary">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="absolute top-0 w-full flex-shrink-0 flex items-center justify-center bg-slate-700 p-4">
                  <Link
                    href={{
                      pathname: routes.public.Home,
                    }}
                  >
                    <Image
                      width={100}
                      height={100}
                      src="/assets/images/site_logo_whit.png"
                      alt="online-shop"
                    />
                  </Link>
                </div>
                {/* <div className="w-full border-t border-slate-400"/> */}
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={
                          item.href === 'logout'
                            ? routes.public.Home
                            : item.href
                        }
                        onClick={() => {
                          setActiveTab(item.href);

                          if (item.href === 'logout') {
                            logoutServices();
                            Cookies.remove('access_token');
                            Cookies.remove('refresh_token');
                            Cookies.remove('user_role');
                            localStorage.removeItem('user_info');
                          }
                        }}
                        className={classNames(
                          activeTab === item.href
                            ? 'bg-slate-700 text-white'
                            : 'text-gray-300 hover:bg-links hover:text-white',
                          'group flex items-center gap-3 px-2 py-2 text-base font-medium rounded-md'
                        )}
                      >
                        <item.icon
                          className={classNames(
                            activeTab === item.href
                              ? 'text-gray-300'
                              : 'text-gray-400 group-hover:text-gray-300',
                            'mr-4 flex-shrink-0 h-6 w-6'
                          )}
                          aria-hidden="true"
                        />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex-1 flex flex-col min-h-0 bg-primary pt-36 ">
            <div className="absolute top-0 w-full flex items-center justify-center flex-shrink-0 p-4 bg-slate-700">
              <Link
                href={{
                  pathname: routes.public.Home,
                }}
              >
                <Image
                  width={100}
                  height={100}
                  src="/assets/images/site_logo_whit.png"
                  alt="online-shop"
                />
              </Link>
            </div>
            {/* <div className="w-full border-t border-slate-400 mb-4"/> */}
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={{
                      pathname:
                        item.href === 'logout'
                          ? routes.protected.Logout
                          : item.href,
                    }}
                    onClick={() => {
                      setActiveTab(item.href);
                    }}
                    className={classNames(
                      activeTab === item.href
                        ? 'bg-gray-700 text-white'
                        : 'text-gray-300 hover:bg-links hover:text-white',
                      'group flex items-center gap-3 px-2 py-2 text-sm font-medium rounded-md'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        activeTab === item.href
                          ? 'text-gray-300'
                          : 'text-gray-400 group-hover:text-gray-300',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
