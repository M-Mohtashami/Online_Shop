import Button from '@/components/shared_components/Button';
import { ProductDataContext } from '@/pages/admin/products';
import { classNames } from '@/utils';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

import {
  CategoryType,
  ProductType,
  SubCategoryType,
} from '@/interfaces/inretfaces';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

const AddNewProduct = () => {
  const { categories, subcategories } = useContext(ProductDataContext);
  console.log(categories);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [selectedCategory, setSelectedCategory] = useState({
    _id: '',
    name: 'دسته‌بندی',
  });
  const [selectedSubCategory, setSelectedSubCategory] = useState({
    _id: '',
    name: 'زیردسته',
  });
  const [query, setQuery] = useState('');

  const onSubmit = (data) => {
    console.log(data);
  };

  console.log(selectedCategory);

  return (
    <div className="mt-6">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* ورودی نام کالا */}

        <div>
          <label className="block text-sm font-medium text-right">
            {'نام کالا'}
          </label>
          <div className="mt-1">
            <input
              type="text"
              {...register('productName', { required: true })}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* <small className="text-red-500">{errors?.productName?.message}</small> */}
        </div>
        <div className="w-full flex gap-8">
          {/* ورودی قیمت کالا */}
          <div className="w-1/2 ">
            <label className="block text-sm font-medium text-right">
              {'قیمت'}
            </label>
            <div className="mt-1">
              <input
                type="text"
                {...register('price', { required: true })}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            {/* <small className="text-red-500">{errors?.price?.message}</small> */}
          </div>
          {/* ورودی تعداد کالا */}
          <div className="w-1/2 ">
            <label className="block text-sm font-medium text-right">
              {'تعداد'}
            </label>
            <div className="mt-1">
              <input
                type="number"
                {...register('quantity', { required: true })}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            {/* <small className="text-red-500">{errors?.quantity?.message}</small> */}
          </div>
        </div>
        <div className="w-full flex justify-between">
          {/* ورودی دسته بندی کالا */}
          <Combobox
            as="div"
            value={selectedCategory}
            onChange={setSelectedCategory}
          >
            <div className="relative mt-1 w-full">
              <Combobox.Input
                className="w-full rounded-md border border-gray-300 bg-white py-2 pr-3 pl-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                {...register('category')}
                displayValue={(category: CategoryType) => category.name}
              />
              <Combobox.Button className="absolute inset-y-0 left-0 flex items-center rounded-r-md px-2 focus:outline-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>

              {categories.data.categories.length > 0 && (
                <Combobox.Options className="absolute z-10 mt-1 max-h-52 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm text-right">
                  {categories.data.categories.map((category: CategoryType) => (
                    <Combobox.Option
                      key={category._id}
                      value={category}
                      // onClick={(e) => {
                      //   if (category._id != '') {
                      //     router.push({
                      //       pathname: router.pathname,
                      //       query: {
                      //         ...router.query,
                      //         category: category._id,
                      //       },
                      //     });
                      //   } else {
                      //     const { pathname, query } = router;
                      //     const params = new URLSearchParams(query);
                      //     params.delete('category');
                      //     router.replace({
                      //       pathname: pathname,
                      //       query: params.toString(),
                      //     });
                      //   }
                      // }}
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
          {/* ورودی زیردسته بندی کالا */}
          <Combobox
            as="div"
            value={selectedSubCategory}
            onChange={setSelectedSubCategory}
          >
            <div className="relative mt-1 w-full">
              <Combobox.Input
                className="w-full rounded-md border border-gray-300 bg-white py-2 pr-3 pl-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                {...register('category')}
                displayValue={(category: CategoryType) => category.name}
              />
              <Combobox.Button className="absolute inset-y-0 left-0 flex items-center rounded-r-md px-2 focus:outline-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>

              {
                <Combobox.Options className="absolute z-10 mt-1 max-h-52 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm text-right">
                  {subcategories.data.subcategories
                    .filter(
                      (sub: SubCategoryType) =>
                        sub.category === selectedCategory._id
                    )
                    .map((subcategory: SubCategoryType) => (
                      <Combobox.Option
                        key={subcategory._id}
                        value={subcategory}
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
                              {subcategory.name}
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
              }
            </div>
          </Combobox>
        </div>

        <div>
          <Button
            icon="forward"
            type="submit"
            variant="contained"
            className="w-full bg-primary hover:bg-links"
          >
            {'افزودن'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddNewProduct;
