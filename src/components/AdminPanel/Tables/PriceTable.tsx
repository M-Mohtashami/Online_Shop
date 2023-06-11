import { thumbnails } from '@/config/variable';
import { ProductType } from '@/interfaces/inretfaces';
import { classNames } from '@/utils';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Fragment, useState, useEffect } from 'react';

import {
  FiChevronsLeft,
  FiChevronsRight,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';

type Props = {
  products: {
    status: string;
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: {
      products: ProductType[];
    };
  };
};

const PriceTable = ({ products }: Props) => {
  const { page, per_page, total, total_pages } = products;
  const router = useRouter();

  return (
    <>
      <form className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex-auto"></div>
          <div className="mt-4 sm:mt-0 sm:flex-none">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              {'ذخیره'}
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
                        {'نام محصول'}
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                      >
                        {'قیمت'}
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                      >
                        {'موجودی'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {products.data.products.map((product) => (
                      <tr key={product._id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">
                                {product.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <input
                            className="text-gray-900"
                            value={Intl.NumberFormat('fa-IR').format(
                              product.price
                            )}
                            onChange={(e) => console.log(e.target.value)}
                          />

                          {/* </div> */}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <input
                            className="text-gray-900"
                            value={Intl.NumberFormat('fa-IR').format(
                              product.quantity
                            )}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </form>
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
    </>
  );
};

export default PriceTable;
