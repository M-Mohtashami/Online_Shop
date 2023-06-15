import { thumbnails } from '@/config/variable';
import useUpdatePrice from '@/hooks/product/useUpdatePrice';
import { ProductPriceForm, ProductType } from '@/interfaces/inretfaces';
import { classNames } from '@/utils';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  FiChevronsLeft,
  FiChevronsRight,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import UpdatePrice from '../Modals/UpdatePrice';

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

const initPriceTableData: ProductPriceForm[] = [];

const PriceTable = ({ products }: Props) => {
  const { page, per_page, total, total_pages, data } = products;
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    setValue,
    getValues,
    reset,
  } = useForm({
    defaultValues: initPriceTableData,
  });
  // console.log(dirtyFields[0]?.price);
  const { mutate: updatePrice } = useUpdatePrice({
    onSuccess(date) {
      // console.log(data);
      reset();
    },
  });
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState({});
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    console.log(dirtyFields);

    if (isDirty) {
      updatePrice(Object.values(getValues()));
    }
  };

  useEffect(() => {
    const products = data.products;
    products.map((product, idx) => {
      setValue(`${idx}.id`, product._id);
      setValue(`${idx}.name`, product.name);
      setValue(`${idx}.price`, product.price);
      setValue(`${idx}.quantity`, product.quantity);
    });
  }, [page]);

  return (
    <>
      <form className="px-4 sm:px-6 lg:px-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex-auto"></div>
          <div className="mt-4 sm:mt-0 sm:flex-none">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-links focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
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
                    {data.products.map((product, idx) => {
                      return (
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
                          <td
                            className={
                              'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                            }
                          >
                            <Controller
                              control={control}
                              name={`${idx}.price`}
                              render={({
                                field: { onChange, value, name },
                              }) => (
                                <input
                                  className={classNames(
                                    dirtyFields[idx]?.price
                                      ? 'bg-green-300 rounded-md'
                                      : '',
                                    'text-gray-900 p-1'
                                  )}
                                  name={name}
                                  value={value}
                                  onChange={onChange}
                                />
                              )}
                            />

                            {/* </div> */}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <Controller
                              control={control}
                              name={`${idx}.quantity`}
                              render={({
                                field: { onChange, value, name },
                              }) => (
                                <input
                                  className={classNames(
                                    dirtyFields[idx]?.quantity
                                      ? 'bg-green-300 rounded-md'
                                      : '',
                                    'text-gray-900 p-1'
                                  )}
                                  name={name}
                                  value={value}
                                  onChange={onChange}
                                />
                              )}
                            />
                          </td>
                        </tr>
                      );
                    })}
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
            if (isDirty) {
              setOptions({
                pathname: router.pathname,
                query: {
                  ...router.query,
                  page: 1,
                },
              });
              openModal();
            } else {
              router.push({
                pathname: router.pathname,
                query: {
                  ...router.query,
                  page: 1,
                },
              });
            }
          }}
        >
          <FiChevronsRight />
        </button>
        <button
          className="border rounded p-1"
          onClick={(e) => {
            if (page - 1 >= 1) {
              if (isDirty) {
                setOptions({
                  pathname: router.pathname,
                  query: {
                    ...router.query,
                    page: page - 1,
                  },
                });
                openModal();
              } else {
                router.push({
                  pathname: router.pathname,
                  query: {
                    ...router.query,
                    page: page - 1,
                  },
                });
              }
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
                if (isDirty) {
                  setOptions({
                    pathname: router.pathname,
                    query: {
                      ...router.query,
                      page: +e.target.value,
                    },
                  });
                  openModal();
                } else {
                  router.push({
                    pathname: router.pathname,
                    query: {
                      ...router.query,
                      page: +e.target.value,
                    },
                  });
                }
              }
            }}
          />
        </span>
        <button
          className="border rounded p-1"
          onClick={(e) => {
            if (page + 1 <= total_pages) {
              if (isDirty) {
                setOptions({
                  pathname: router.pathname,
                  query: {
                    ...router.query,
                    page: page + 1,
                  },
                });
                openModal();
              } else {
                router.push({
                  pathname: router.pathname,
                  query: {
                    ...router.query,
                    page: page + 1,
                  },
                });
              }
            }
          }}
        >
          <FiChevronLeft />
        </button>
        <button
          className="border rounded p-1"
          onClick={(e) => {
            if (isDirty) {
              setOptions({
                pathname: router.pathname,
                query: {
                  ...router.query,
                  page: total_pages,
                },
              });
              openModal();
            } else {
              router.push({
                pathname: router.pathname,
                query: {
                  ...router.query,
                  page: total_pages,
                },
              });
            }
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
      <UpdatePrice
        reset={reset}
        options={options}
        open={open}
        closeModal={closeModal}
      />
    </>
  );
};

export default PriceTable;
