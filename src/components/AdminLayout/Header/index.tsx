import { Fragment, useRef } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { HiMenu } from 'react-icons/hi';
import { TbCategory } from 'react-icons/tb';
import { IoMdClose } from 'react-icons/io';
import { RiMenu3Line } from 'react-icons/ri';
import Link from 'next/link';
import { icons } from '@/config/variable';

const Header = () => {
  return (
    <Popover className="relative top-0 z-50 bg-white border-b shadow-sm py-2">
      <div className="flex justify-end items-center px-4 py-2 sm:px-6 md:justify-end md:space-x-10">
        <div className="-mr-2 -my-2 md:hidden">
          <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span className="sr-only">Open menu</span>
            <HiMenu className="h-6 w-6" aria-hidden="true" />
          </Popover.Button>
        </div>
        <div className="hidden md:flex-1 md:flex md:items-center md:justify-end">
          <div className="flex items-center md:ml-2">
            <Link
              href="#"
              className="ml-4 inline-flex items-center justify-center p-2 font-semibold text-md text-base text-links hover:text-primary"
            >
              {'محصول جدید'}
            </Link>
            <Link
              href="#"
              className="ml-4 inline-flex items-center justify-center p-2 font-semibold text-md text-base text-links hover:text-primary"
            >
              {'دسته‌بندی جدید'}
            </Link>
            <Link
              href="/"
              className="ml-4 inline-flex items-center justify-center p-2 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-primary hover:bg-links"
            >
              {icons.forward('')}
            </Link>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <IoMdClose className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="py-2 px-5">
              <div className="flex flex-col items-start md:mb-2">
                <Link
                  href="#"
                  className="flex gap-3 justify-between mb-4 w-32 px-2 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-links"
                >
                  {'محصول جدید'}
                </Link>
                <Link
                  href="#"
                  className="flex gap-3 justify-between mb-4 w-32 px-2 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-links"
                >
                  {'دسته‌بندی جدید'}
                </Link>
                <Link
                  href="/"
                  className="flex gap-3 items-center justify-between mb-4 w-32 px-2 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-links"
                >
                  <span>{'خروج'}</span>
                  {icons.forward('')}
                </Link>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Header;
