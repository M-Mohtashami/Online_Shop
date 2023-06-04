import { LayoutProps } from '@/interfaces/inretfaces';
import React from 'react';
import { Fragment, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuAlt2Icon } from '@heroicons/react/outline';
import { classNames } from '@/utils';

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

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
          <div className="ml-4 flex items-center md:ml-6">
            <button
              type="button"
              className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="ml-3 relative">
              <div>
                <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {userNavigation.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <a
                          href={item.href}
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          )}
                        >
                          {item.name}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

{
  /* <Popover className="relative top-0 z-50 bg-white border-b shadow-sm py-2">
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
</Popover> */
}
