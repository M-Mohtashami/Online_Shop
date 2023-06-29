import { classNames } from '@/utils';
import { Combobox } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi';
import { FaSort } from 'react-icons/fa';
import {
  AdminOrderType,
  CategoryType,
  OrdersType,
} from '@/interfaces/inretfaces';
import UpdateOrders from '../Modals/UpdateOrders';
import { set } from 'lodash';

const categories = [
  {
    _id: 'false',
    name: 'سفارش های تحویل شده',
  },
  {
    _id: 'true',
    name: 'سفارش های در انتظار ارسال',
  },
];

type Props = {
  orders: OrdersType;
};

const OrdersTable = ({ orders }: Props) => {
  const { page, per_page, total, total_pages, data } = orders;
  const router = useRouter();
  const [selected, setSelected] = useState({
    _id: '',
    name: 'همه',
  });
  const [query, setQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<AdminOrderType>();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="w-full sm:flex sm:items-center sm:justify-end">
          <Combobox as="div" value={selected} onChange={setSelected}>
            <div className="relative mt-1 flex gap-2 items-center">
              <Combobox.Label className="w-full text-left">
                {'فیلتر سفارش ها:'}
              </Combobox.Label>
              <Combobox.Input
                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(category: CategoryType) => category.name}
              />
              <Combobox.Button className="absolute inset-y-0 left-0 flex items-center rounded-r-md px-2 focus:outline-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>

              {categories.length > 0 && (
                <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {[
                    {
                      _id: '',
                      name: 'همه',
                    },
                    ...categories,
                  ].map((category) => (
                    <Combobox.Option
                      key={category._id}
                      value={category}
                      onClick={(e) => {
                        if (category._id === 'true') {
                          router.push({
                            pathname: router.pathname,
                            query: {
                              ...router.query,
                              deliveryStatus: true,
                            },
                          });
                        } else if (category._id === 'false') {
                          router.push({
                            pathname: router.pathname,
                            query: {
                              ...router.query,
                              deliveryStatus: false,
                            },
                          });
                        } else {
                          router.push({
                            pathname: router.pathname,
                            query: '',
                          });
                        }
                      }}
                      className={({ active }) =>
                        classNames(
                          'relative cursor-default select-none py-2 pl-8 pr-4',
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                        )
                      }
                    >
                      {({ active, selected }) => (
                        <>
                          <span
                            className={classNames(
                              'block truncate',
                              selected ? 'font-semibold' : ''
                            )}
                          >
                            {category.name}
                          </span>

                          {selected && (
                            <span
                              className={classNames(
                                'absolute inset-y-0 left-0 flex items-center pl-1.5',
                                active ? 'text-white' : 'text-indigo-600'
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              )}
            </div>
          </Combobox>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-right text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        {'نام کاربر'}
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-right text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        {'مجموع مبلغ'}
                      </th>
                      <th
                        onClick={() => {
                          console.log(router.query.sort);
                          router.push({
                            pathname: router.pathname,
                            query: {
                              ...router.query,
                              sort:
                                router.query?.sort === 'createdAt'
                                  ? '-createdAt'
                                  : 'createdAt',
                            },
                          });
                        }}
                        scope="col"
                        className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 flex gap-1 items-center cursor-pointer"
                      >
                        {'زمان ثبت سفارش'}
                        <FaSort />
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {data.orders.map((order: AdminOrderType) => (
                      <tr key={order._id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            {order.user.firstname + ' ' + order.user.lastname}
                          </div>
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">
                                {Intl.NumberFormat('fa-IR').format(
                                  order.totalPrice
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-900">
                            {new Date(order.createdAt).toLocaleDateString(
                              'fa-IR',
                              { year: 'numeric', month: 'long', day: 'numeric' }
                            )}
                          </div>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setOpen(true);
                            }}
                            className="text-indigo-600 hover:text-indigo-900 "
                          >
                            {order.deliveryStatus ? (
                              <span className="inline-flex rounded-lg py-1 ml-2 bg-gray-200 px-2 text-xs font-semibold leading-5 text-gray-800">
                                {'مشاهده'}
                              </span>
                            ) : (
                              <span className="inline-flex rounded-lg py-1 ml-2 bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                {'بررسی سفارش'}
                              </span>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* pagination section */}
      <div className="mt-4 flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={(e) => {
            router.push({
              pathname: router.pathname,
              query: {
                ...router.query,
                page: 1,
              },
            });
          }}
        >
          <FiChevronsRight />
        </button>
        <button
          className="border rounded p-1"
          onClick={(e) => {
            if (page - 1 >= 1) {
              router.push({
                pathname: router.pathname,
                query: {
                  ...router.query,
                  page: page - 1,
                },
              });
            }
          }}
        >
          <FiChevronRight />
        </button>
        <span className="flex items-center gap-1">
          <input
            value={page}
            type="number"
            className="border px-1 rounded w-10 text-center"
            onChange={(e) => {
              if (+e.target.value <= total_pages && +e.target.value >= 1) {
                router.push({
                  pathname: router.pathname,
                  query: {
                    ...router.query,
                    page: +e.target.value,
                  },
                });
              }
            }}
          />
        </span>
        <button
          className="border rounded p-1"
          onClick={(e) => {
            if (page + 1 <= total_pages) {
              router.push({
                pathname: router.pathname,
                query: {
                  ...router.query,
                  page: page + 1,
                },
              });
            }
          }}
        >
          <FiChevronLeft />
        </button>
        <button
          className="border rounded p-1"
          onClick={(e) => {
            router.push({
              pathname: router.pathname,
              query: {
                ...router.query,
                page: total_pages,
              },
            });
          }}
        >
          <FiChevronsLeft />
        </button>

        <select
          value={per_page}
          onChange={(e) => {
            router.push({
              pathname: router.pathname,
              query: {
                ...router.query,
                page: 1,
                limit: +e.target.value,
              },
            });
          }}
        >
          {Array.from(new Set([per_page, 5, 10, 20, 50]))
            .sort((a, b) => a - b)
            .map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {'تعداد:'} {pageSize}
              </option>
            ))}
        </select>
      </div>
      <UpdateOrders
        order={selectedOrder}
        closeModal={() => setOpen(false)}
        open={open}
      />
    </>
  );
};

export default OrdersTable;
