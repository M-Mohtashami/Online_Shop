import Filter from '@/components/Products/Filter';
import SideFilter from '@/components/Products/SideFilter';
import { FilterContext } from '@/context';
import { LayoutProps } from '@/interfaces/inretfaces';
import { classNames } from '@/utils';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  FilterIcon,
  MinusSmIcon,
  PlusSmIcon,
  ViewGridIcon,
  XIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useContext, useState } from 'react';
import * as Slider from '@radix-ui/react-slider';

const sortOptions = [
  { name: 'محبوب ترین', href: '-rating.rate' },
  { name: 'جدیدترین', href: '-createdAt' },
  { name: 'قیمت: نزولی', href: '-price' },
  { name: 'قیمت: صعودی', href: 'price' },
];

const filters = [
  {
    id: 'quantity',
    name: 'براساس موجودی',
    options: [
      { value: '-1', label: 'همه' },
      { value: '0', label: 'موجود' },
    ],
  },
];

const ProductLayout = ({ children }: LayoutProps) => {
  console.log(children);
  const router = useRouter();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { subcategories } = useContext(FilterContext);
  return (
    <div className="w-full h-full flex">
      {/* <SideFilter /> */}
      <section className="w-full flex flex-col gap-3">
        {/* <Filter /> */}
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
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
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  <h3 className="w-full bg-white border-b border-gray-200 shadow-sm p-2 mb-3">
                    {'زیردسته ها'}
                  </h3>
                  <ul
                    role="list"
                    className="text-sm font-medium text-gray-900 space-y-4 pb-6 pr-4 border-b border-gray-200 overflow-y-auto max-h-[10rem]"
                  >
                    {subcategories.map((category) => (
                      <li
                        key={category._id}
                        className="flex items-center gap-3 text-primary"
                      >
                        <input
                          type="checkbox"
                          name={category.name}
                          value={category._id}
                        />
                        <label htmlFor={category.name}>{category.name}</label>
                      </li>
                    ))}
                  </ul>

                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="mr-6 flex items-center">
                                {open ? (
                                  <MinusSmIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusSmIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="mr-3 min-w-0 text-primary flex-1 text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        <main className="max-w-7xl mx-auto px-4 mt-20 sm:px-6 lg:px-8 ">
          <div className="relative z-10 flex items-baseline justify-between pt-4 pb-6  border-b border-gray-200 bg-links/10">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900"></h1>

            <div className="flex items-center ">
              <Menu as="div" className="relative inline-block text-right ml-10">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    {'مرتب سازی'}
                    <ChevronDownIcon
                      className="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
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
                  <Menu.Items className="origin-top-left absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <Link
                              href={{
                                pathname: router.pathname,
                                query: {
                                  ...router.query,
                                  sort: option.href,
                                },
                              }}
                              className={classNames(
                                router.query.sort === option.href
                                  ? 'font-medium text-gray-900 bg-links/30'
                                  : !router.query.sort &&
                                    option.href === '-rating.rate'
                                  ? 'font-medium text-gray-900 bg-links/30'
                                  : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              {/* <button
                type="button"
                className="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">View grid</span>
                <ViewGridIcon className="w-5 h-5" aria-hidden="true" />
              </button> */}
              <button
                type="button"
                className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FilterIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10 ">
              {/* Filters */}
              <form className="hidden lg:block bg-links/10 p-4">
                <h3 className="w-full bg-white border-b border-gray-400 shadow-sm p-2 mb-3">
                  {'زیردسته ها'}
                </h3>
                <ul
                  role="list"
                  className="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200 overflow-y-auto max-h-[10rem]"
                >
                  {subcategories.map((category) => (
                    <li
                      key={category._id}
                      className="flex items-center gap-3 text-primary"
                    >
                      <input
                        type="radio"
                        name="subcategory"
                        value={category._id}
                        checked={
                          router.query.subcategory === category._id
                            ? true
                            : false
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            router.push({
                              pathname: router.pathname,
                              query: {
                                ...router.query,
                                subcategory: category._id,
                              },
                            });
                          }
                        }}
                      />
                      <label htmlFor="subcategory">{category.name}</label>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                            <span className="mr-3 font-medium text-gray-900 ">
                              {section.name}
                            </span>
                            <span className="ml-1 flex items-center">
                              {open ? (
                                <MinusSmIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusSmIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  name={`exist`}
                                  checked={
                                    router.query.quantity === option.value
                                      ? true
                                      : false
                                  }
                                  type="radio"
                                  className="h-3 w-3 border-gray-300 rounded text-primary focus:ring-links"
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      router.push({
                                        pathname: router.pathname,
                                        query: {
                                          ...router.query,
                                          quantity: option.value,
                                        },
                                      });
                                    }
                                  }}
                                />
                                <label
                                  htmlFor={`exist`}
                                  className="mr-3 text-sm text-gray-600 text.primary"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
                <Disclosure as="div" className="border-b border-gray-200 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                          <span className="mr-3 font-medium text-gray-900 ">
                            {'قیمت'}
                          </span>
                          <span className="ml-1 flex items-center">
                            {open ? (
                              <MinusSmIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusSmIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <Slider.Root
                          className="relative flex items-center select-none touch-none w-[200px] h-5"
                          defaultValue={[25]}
                          max={100}
                          step={1}
                        >
                          <Slider.Track className="bg-primary/30 relative grow rounded-full h-[3px]">
                            <Slider.Range className="absolute bg-primary rounded-full h-full" />
                          </Slider.Track>
                          <Slider.Thumb
                            className="block w-5 h-5 bg-primary shadow-[0_2px_10px] shadow-gray-200 rounded-[10px] hover:bg-links focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-gray-200"
                            aria-label="Volume"
                          />
                        </Slider.Root>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </form>

              {/* Product grid */}
              {children}
            </div>
          </section>
        </main>
      </section>
    </div>
  );
};

export default ProductLayout;
