import Button from '@/components/shared_components/Button';
import { ProductDataContext } from '@/pages/admin/products';
import { classNames } from '@/utils';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon, XIcon } from '@heroicons/react/solid';
import {
  CategoryType,
  ProductType,
  SubCategoryType,
} from '@/interfaces/inretfaces';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import dynamic from 'next/dynamic';
import { modules } from '@/utils/QuillToolbar';
import 'react-quill/dist/quill.snow.css';

type Props = {
  product: ProductType | undefined;
  closeModal: () => void;
  action: string;
};

const AddNewProduct = ({ action, product, closeModal }: Props) => {
  const ReactQuill = useMemo(
    () => dynamic(import('react-quill'), { ssr: false }),
    []
  );
  const { categories, subcategories } = useContext(ProductDataContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [selectedCategory, setSelectedCategory] = useState(
    product
      ? product.category
      : {
          _id: '',
          name: 'دسته‌بندی',
        }
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    product
      ? product.subcategory
      : {
          _id: '',
          name: 'زیردسته',
        }
  );
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  console.log(filteredSubCategories);

  const [image, setImage] = useState<(any & { preview: string })[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/webpe': ['.webpe'],
      'image/jpg': ['.jpg'],
      'image/jpeg': ['.jpeg'],
    },
    onDrop: (acceptedFiles) => {
      setImage(
        acceptedFiles.map((upFile) =>
          Object.assign(upFile, {
            preview: URL.createObjectURL(upFile),
          })
        )
      );
    },
  });

  const [description, setDescription] = useState({ value: '' });
  const handleDescription = (value: string) => {
    setDescription({ value });
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    setFilteredSubCategories(
      subcategories.data.subcategories.filter(
        (sub: SubCategoryType) => sub.category === selectedCategory._id
      )
    );
  }, [selectedCategory]);

  return (
    <div className="mt-8">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* ورودی نام کالا */}
        <div>
          <label className="block text-sm font-medium text-right">
            {'نام کالا'}
          </label>
          <div className="mt-1">
            <input
              type="text"
              value={product?.name}
              {...register('productName', { required: true })}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* <small className="text-red-500">{errors?.productName?.message}</small> */}
        </div>
        <div className="w-full flex gap-4 md:gap-8">
          {/* ورودی قیمت کالا */}
          <div className="w-1/2 ">
            <label className="block text-sm font-medium text-right">
              {'قیمت'}
            </label>
            <div className="mt-1">
              <input
                value={product?.price}
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
                value={product?.quantity}
                type="number"
                {...register('quantity', { required: true })}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            {/* <small className="text-red-500">{errors?.quantity?.message}</small> */}
          </div>
        </div>
        <div className="w-full flex justify-between gap-4">
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
                displayValue={(subcategory: SubCategoryType) =>
                  subcategory.name
                }
              />
              <Combobox.Button className="absolute inset-y-0 left-0 flex items-center rounded-r-md px-2 focus:outline-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>

              {
                <Combobox.Options className="absolute z-10 mt-1 max-h-52 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm text-right">
                  {filteredSubCategories.map((subcategory: SubCategoryType) => (
                    <Combobox.Option
                      key={subcategory._id}
                      value={subcategory}
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
        {/* قسمت دریافت تصاویر */}
        <div>
          <div className="w-full h-32" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="w-full h-full border-4 border-dashed border-links bg-links/20 flex items-center justify-center">
                {'Drop the files here ...'}
              </p>
            ) : (
              <p className="w-full h-full border-4 border-dashed border-gray-400 bg-gray-400/10 flex items-center justify-center">
                {'Drag & drop files || click to select files'}
              </p>
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto mt-2">
            {image.map((upFile) => {
              return (
                <div
                  key={upFile.lastModified}
                  className="relative w-16 h-16 overflow-hidden"
                >
                  <img
                    src={upFile.preview}
                    alt=""
                    className="w-full h-full aspect-square"
                  />
                  <div
                    onClick={() => {
                      setImage((prev) =>
                        prev.filter((newFile) => newFile.path !== upFile.path)
                      );
                    }}
                    className="absolute flex items-center justify-center text-red-500 top-0 w-full h-full bg-links/20 opacity-0 hover:opacity-100"
                  >
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* قسمت دریافت توضیحات */}
        <div className="text-left">
          <ReactQuill
            value={description.value}
            onChange={handleDescription}
            placeholder={'توضیحات...'}
            modules={modules}
            className="text-left"
          />
        </div>
        <div>
          <Button
            icon="forward"
            type="submit"
            variant="contained"
            className="w-full bg-primary hover:bg-links"
          >
            {action}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddNewProduct;
