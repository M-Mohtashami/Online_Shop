import { thumbnails } from '@/config/variable';
import { CategoryType, ProductType } from '@/interfaces/inretfaces';
import { classNames } from '@/utils';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { Fragment, useState, useEffect } from 'react';
import {
  FiChevronsLeft,
  FiChevronsRight,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import Delete from '../Modals/Delete';
import AddModal from '../Modals/AddModal';
import { ProductDataContext } from '@/context';
import Image from 'next/image';

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

  categories: CategoryType[];
};

const ProductTable = () => {
  const { products, categories } = useContext(ProductDataContext);

  const { page, per_page, total, total_pages, data } = products;
  const router = useRouter();
  const [selected, setSelected] = useState({
    _id: '',
    name: 'دسته‌بندی',
  });
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<
    ProductType | undefined
  >();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  function closeAddModal() {
    setIsAddOpen(false);
  }

  function openAddModal() {
    setIsAddOpen(true);
  }

  useEffect(() => {
    console.log(data.products);

    if (data.products.length <= 0) {
      console.log(page, total_pages);
      router.replace({
        pathname: router.pathname,
        query: {
          ...router.query,
          page: page - 1,
        },
      });
    }
  });

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex-auto"></div>
          <div className="mt-4 sm:mt-0 sm:flex-none">
            <button
              onClick={() => {
                setSelectedProduct(undefined);
                openAddModal();
              }}
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-links focus:outline-none focus:ring-2 focus:ring-links focus:ring-offset-2 sm:w-auto"
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
                        {'تصویر'}
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-right text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        {'نام محصول'}
                      </th>
                      <th
                        scope="col"
                        className="w-52 px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                      >
                        <Combobox
                          as="div"
                          value={selected}
                          onChange={setSelected}
                        >
                          <div className="relative mt-1 w-48">
                            <Combobox.Input
                              className="w-full max-w-52 rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                              onChange={(event) => setQuery(event.target.value)}
                              displayValue={(category: CategoryType) =>
                                category.name
                              }
                            />
                            <Combobox.Button className="absolute inset-y-0 left-0 flex items-center rounded-r-md px-2 focus:outline-none">
                              <SelectorIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </Combobox.Button>

                            {categories?.data?.categories.length > 0 && (
                              <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {[
                                  {
                                    _id: '',
                                    name: 'دسته‌بندی',
                                  },
                                  ...categories?.data?.categories,
                                ].map((category) => (
                                  <Combobox.Option
                                    key={category._id}
                                    value={category}
                                    onClick={(e) => {
                                      if (category._id != '') {
                                        router.push({
                                          pathname: router.pathname,
                                          query: {
                                            ...router.query,
                                            category: category._id,
                                          },
                                        });
                                      } else {
                                        const { pathname, query } = router;
                                        console.log(query);

                                        const params = new URLSearchParams(
                                          query as unknown as string
                                        );
                                        params.delete('category');
                                        router.replace({
                                          pathname: pathname,
                                          query: params.toString(),
                                        });
                                      }
                                    }}
                                    className={({ active }) =>
                                      classNames(
                                        'relative cursor-default select-none py-2 pl-8 pr-4',
                                        active
                                          ? 'bg-indigo-600 text-white'
                                          : 'text-gray-900'
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
                                              active
                                                ? 'text-white'
                                                : 'text-indigo-600'
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
                        {/* {'دسته‌بندی'} */}
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
                    {data.products.map((product: ProductType) => (
                      <tr key={product._id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="h-12 w-10 flex-shrink-0 rounded-md overflow-hidden">
                              <Image
                                className="w-full h-full"
                                src={thumbnails + product.thumbnail}
                                alt={product.name}
                                width={1080}
                                height={1080}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">
                                {product.name}
                              </div>
                              {/* <div className="text-gray-500">
                                {person.email}
                              </div> */}
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-900">
                            {product.category.name}
                          </div>
                          <div className="text-gray-500">
                            {product.subcategory.name}
                          </div>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={() => {
                              setSelectedProduct(product);
                              openAddModal();
                            }}
                            className="text-indigo-600 hover:text-indigo-900 "
                          >
                            <span className="inline-flex rounded-lg py-1 ml-2 bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                              {'ویرایش'}
                            </span>
                          </button>
                          <button
                            onClick={() => {
                              setSelectedProduct(product);
                              openModal();
                            }}
                            className="text-indigo-600 hover:text-indigo-900 "
                          >
                            <span className="inline-flex rounded-lg py-1 bg-red-100 px-2 text-xs font-semibold leading-5 text-secondery">
                              {'حذف'}
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Delete
                  product={selectedProduct}
                  closeModal={closeModal}
                  open={isOpen}
                />
                <AddModal
                  product={selectedProduct}
                  closeModal={closeAddModal}
                  open={isAddOpen}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* pagination section */}
      <div className="mt-4 flex items-center gap-2 py-2 px-4 bg-white rounded-full">
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

export default ProductTable;
