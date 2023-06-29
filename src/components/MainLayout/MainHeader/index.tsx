import { Fragment, useEffect, useRef, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { HiMenu } from 'react-icons/hi';
import { RiMenu3Line } from 'react-icons/ri';
import Link from 'next/link';
import { classNames } from '@/utils';
import { icons } from '@/config/variable';
import {
  CartStateType,
  CategoryType,
  RootState,
  SubCategoryType,
} from '@/interfaces/inretfaces';
import { useSelector } from 'react-redux';
import { routes } from '@/config/routes';

type Props = {
  categories: {
    status: string;
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: {
      categories: CategoryType[];
    };
  };
  subcategories: {
    status: string;
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: {
      subcategories: SubCategoryType[];
    };
  };
};

const timeoutDuration = 200;

const MainHeader = ({ categories, subcategories }: Props) => {
  const categoriesData = categories?.data.categories;
  const subcategoriesData = subcategories?.data.subcategories;

  const { cart } = useSelector((state: RootState) => state.cart);
  console.log(cart);
  const [cartAmount, setCartAmount] = useState<number>();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const timeOutRef = useRef<number | undefined | NodeJS.Timeout>(undefined);

  const handleEnter = (isOpen: boolean) => {
    clearTimeout(timeOutRef.current);
    !isOpen && triggerRef.current?.click();
  };

  const handleLeave = (isOpen: boolean) => {
    timeOutRef.current = setTimeout(() => {
      isOpen && triggerRef.current?.click();
    }, timeoutDuration);
  };

  useEffect(() => {
    setCartAmount(cart.length);
  });
  return (
    <Popover className="fixed top-0 z-50 w-full bg-white border-b shadow-sm font-light">
      <div className="flex justify-between items-center px-4 py-2 sm:px-6 md:justify-start md:space-x-10">
        <div className=" ml-5">
          <Link href="/" className="flex">
            <span className="sr-only">Workflow</span>
            <img
              className="h-8 w-auto sm:h-10"
              src="/assets/images/site_icon.png"
              alt=""
            />
          </Link>
        </div>
        <div className="-mr-2 -my-2 md:hidden">
          <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span className="sr-only">Open menu</span>
            <HiMenu className="h-6 w-6" aria-hidden="true" />
          </Popover.Button>
        </div>
        <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
          <Popover.Group as="nav" className="flex self-end gap-10">
            <Popover>
              {({ open }) => (
                <div
                  onMouseEnter={() => handleEnter(open)}
                  onMouseLeave={() => handleLeave(open)}
                >
                  <Popover.Button
                    ref={triggerRef}
                    className={classNames(
                      open ? 'text-gray-900' : 'text-gray-500',
                      'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    )}
                  >
                    <RiMenu3Line
                      className={classNames(
                        open ? 'text-gray-600' : 'text-gray-400',
                        'ml-2 h-5 w-5 group-hover:text-gray-500'
                      )}
                      aria-hidden="true"
                    />
                    <span>{'دسته‌بندی'}</span>
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 -translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-1"
                  >
                    <Popover.Panel className="hidden md:block absolute z-10 top-full inset-x-0 transform shadow-lg bg-white">
                      <ul className="max-w-7xl mx-auto grid gap-y-6 px-4 py-6 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-4 lg:px-8 lg:py-12 xl:py-16">
                        {/* header */}
                        {categoriesData.map((category) => {
                          return (
                            <li key={category._id}>
                              <Link
                                href="#"
                                className="border-b border-gray-500"
                              >
                                <h3 className="text-sm font-normal tracking-wide text-gray-900 uppercase border-b border-gray-300 pb-2">
                                  {category.name}
                                </h3>
                              </Link>
                              <ul className="space-y-3 mt-2 pr-3">
                                {subcategoriesData
                                  .filter(
                                    (subcat) => category._id === subcat.category
                                  )
                                  .map((item) => {
                                    return (
                                      <li key={item._id} className="flow-root">
                                        <Link
                                          href="#"
                                          className="-m-3 p-3 flex items-center rounded-md text-base font-normal text-gray-500 transition ease-in-out duration-150"
                                        >
                                          <span className="w-full ml-4 p-1 rounded-md hover:bg-gray-50">
                                            {item.name}
                                          </span>
                                        </Link>
                                      </li>
                                    );
                                  })}
                              </ul>
                            </li>
                          );
                        })}
                      </ul>
                      <div className="bg-gray-50">
                        <div className="max-w-7xl mx-auto space-y-6 px-4 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-6 lg:px-8">
                          {/* header footer */}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </div>
              )}
            </Popover>

            <Link
              href="/about"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              {'درباره ما'}
            </Link>
            <Link
              href="#"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              {'تماس با ما'}
            </Link>

            {/* <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-gray-900' : 'text-gray-500',
                      'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    )}
                  >
                    <span>More</span>
                    <BsChevronDown
                      className={classNames(
                        open ? 'text-gray-600' : 'text-gray-400',
                        'ml-2 h-5 w-5 group-hover:text-gray-500'
                      )}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0">
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          {resources.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="-m-3 p-3 block rounded-md hover:bg-gray-50"
                            >
                              <p className="text-base font-medium text-gray-900">
                                {item.name}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.description}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover> */}
          </Popover.Group>
          <div className="flex items-center md:ml-4">
            <Link
              href="#"
              className="ml-8 inline-flex items-center justify-center p-2 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-primary hover:bg-links"
            >
              {icons.search('')}
            </Link>
            <Link
              href={{
                pathname: routes.protected.Login,
              }}
              className="ml-8 inline-flex items-center justify-center p-2 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-primary hover:bg-links"
            >
              {icons.username('')}
            </Link>
            <div>
              <Link
                href={{
                  pathname: routes.public.Cart,
                }}
                className="relative ml-8 inline-flex items-center justify-center p-2 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-primary hover:bg-links"
              >
                {icons.cart('')}

                {cartAmount ? (
                  <div className="absolute -top-2 -left-2 flex items-center justify-center bg-red-500 rounded-full text-white text-xs font-light w-5 h-5 p-2">
                    <span className="">{cartAmount}</span>
                  </div>
                ) : (
                  ''
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 -translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-1"
      >
        <Popover.Panel className="absolute z-10 inset-x-0 transform shadow-lg bg-white">
          <ul className="max-w-7xl mx-auto grid gap-y-6 px-4 py-6 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-4 lg:px-8 lg:py-12 xl:py-16">
            {/* header */}
            {categoriesData.map((category) => {
              return (
                <li key={category._id}>
                  <Link href="#" className="border-b border-gray-500">
                    <h3 className="text-sm font-medium tracking-wide text-gray-900 uppercase border-b border-gray-300 pb-2">
                      {category.name}
                    </h3>
                  </Link>
                  <ul className="space-y-3 mt-2 pr-3">
                    {subcategoriesData
                      .filter((subcat) => category._id === subcat.category)
                      .map((item) => {
                        return (
                          <li key={item._id} className="flow-root">
                            <Link
                              href="#"
                              className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-500 hover:bg-gray-50 transition ease-in-out duration-150"
                            >
                              <span className="ml-4">{item.name}</span>
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </li>
              );
            })}
          </ul>
          <div className="bg-gray-50">
            <div className="max-w-7xl mx-auto space-y-6 px-4 py-5 sm:flex sm:justify-end sm:space-y-0 sm:space-x-10 sm:px-6 lg:px-8">
              {/* header footer */}
              <div className="flex items-center justify-end md:ml-4">
                <Link
                  href="#"
                  className="ml-8 inline-flex items-center justify-center p-2 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-primary hover:bg-links"
                >
                  {icons.search('')}
                </Link>
                <Link
                  href={{
                    pathname: routes.protected.Login,
                  }}
                  className="ml-8 inline-flex items-center justify-center p-2 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-primary hover:bg-links"
                >
                  {icons.username('')}
                </Link>
                <div>
                  <Link
                    href={{
                      pathname: routes.public.Cart,
                    }}
                    className="relative ml-8 inline-flex items-center justify-center p-2 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-primary hover:bg-links"
                  >
                    {icons.cart('')}

                    {cartAmount ? (
                      <div className="absolute -top-2 -left-2 flex items-center justify-center bg-red-500 rounded-full text-white text-xs font-light w-5 h-5 p-2">
                        <span className="">{cartAmount}</span>
                      </div>
                    ) : (
                      ''
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default MainHeader;
