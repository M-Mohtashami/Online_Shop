import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi';

const OrdersTable = ({ orders }) => {
  const { page, per_page, total, total_pages } = orders;
  const router = useRouter();
  return (
    <>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex-auto"></div>
          <div className="mt-4 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              {'افزودن محصول'}
            </button>
          </div>
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
                        scope="col"
                        className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                      >
                        {'زمان ثبت سفارش'}
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
                    {orders.data.orders.map((order) => (
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
                            {Intl.DateTimeFormat('fa-IR').format(
                              new Date(order.createdAt).getUTCDate()
                            )}
                          </div>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Link
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900 "
                          >
                            <span className="inline-flex rounded-lg py-1 ml-2 bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                              {'بررسی سفارش'}
                            </span>
                          </Link>
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
          {[5, 10, 20, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {'تعداد:'} {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default OrdersTable;
