import Button from '@/components/shared_components/Button';
import { classNames } from '@/utils';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon, XIcon } from '@heroicons/react/solid';
import {
  CategoryType,
  ProductFormType,
  ProductProps,
  ProductType,
  SubCategoryType,
} from '@/interfaces/inretfaces';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import dynamic from 'next/dynamic';
import { modules } from '@/utils/QuillToolbar';
import 'react-quill/dist/quill.snow.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddProduct } from '@/hooks/product/useAddProduct';
import { useRouter } from 'next/router';
import { useUpdateProduct } from '@/hooks/product/useUpdateProduct';
import { TbEaseOutControlPoint } from 'react-icons/tb';
import { on } from 'events';
import { ProductDataContext } from '@/context';
import { IMAGES } from '@/config/variable';

type Props = {
  product: ProductType | undefined;
  closeModal: () => void;
  action: string;
};

const initProduct: ProductFormType = {
  name: '',
  brand: '',
  price: 0,
  quantity: 0,
  category: '',
  subcategory: '',
  description: '',
};

const productSchema = z.object({
  name: z
    .string()
    .min(5, { message: 'نام باید بیشتر از 5 حرف باشد' })
    .nonempty({ message: 'لطفا نام محصول را وارد کنید' }),
  brand: z
    .string()
    .min(3, { message: 'برند باید بیشتر از 3 حرف باشد' })
    .max(10, { message: 'برند نباید بیشتر از 10 حرف باشد' })
    .nonempty({ message: 'لطفا برند محصول را وارد کنید' }),
  price: z.number().min(5000, { message: 'قیمت باید بیشتر از 5000 باشد' }),
  quantity: z.number().min(1, { message: 'تعداد محصول را درست وارد کنید' }),
  category: z.string().nonempty({ message: 'لطفا یک دسته‌انتخاب کنید' }),
  subcategory: z.string().nonempty({ message: 'لطفا یک زیردسته‌انتخاب کنید' }),
  description: z
    .string()
    .nonempty({ message: 'لطفا توضیحات محصول را وارد کنید' }),
});

const AddNewProduct = ({ action, product, closeModal }: Props) => {
  const ReactQuill = useMemo(
    () => dynamic(import('react-quill'), { ssr: false }),
    []
  );
  const { categories, subcategories } = useContext(ProductDataContext);
  const router = useRouter();
  // const [defaultProduct, setDefaultProduct] = useState(initProduct)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
    control,
  } = useForm<ProductFormType>({
    defaultValues: initProduct,
    resolver: zodResolver(productSchema),
  });

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
  const [filteredSubCategories, setFilteredSubCategories] =
    useState<SubCategoryType[]>();
  // console.log(filteredSubCategories);

  const [image, setImage] = useState<(any & { preview: string })[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/webp': ['.webp'],
      'image/jpg': ['.jpg'],
      'image/jpeg': ['.jpeg'],
    },
    onDrop: (acceptedFiles) => {
      setImage((prev) => [
        ...prev,
        ...acceptedFiles.map((upFile) =>
          Object.assign(upFile, {
            preview: URL.createObjectURL(upFile),
          })
        ),
      ]);
    },
  });

  const { mutate: addProduct } = useAddProduct({
    onSuccess: (data) => {
      closeModal();
      router.push({
        pathname: router.pathname,
        query: router.query,
      });
      console.log(data);
    },
    onError: (err) => console.log(err),
  });
  const { mutate: updateProduct } = useUpdateProduct({
    onSuccess: (data) => {
      closeModal();
      router.push({
        pathname: router.pathname,
        query: router.query,
      });
      console.log(data);
    },
    onError: (err) => console.log(err),
  });
  const onSubmit = (data: ProductFormType) => {
    // console.log(data);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('brand', data.brand);
    formData.append('price', data.price.toString());
    formData.append('quantity', data.quantity.toString());
    formData.append('category', selectedCategory._id);
    formData.append('subcategory', selectedSubCategory._id);
    if (image.length > 0) {
      for (const img of image) {
        formData.append('images', img);
      }
      formData.append('thumbnail', image[0]);
    }
    formData.append('description', data.description);

    action === 'ویرایش' && product
      ? updateProduct({ id: product._id, data: formData })
      : addProduct(formData);
  };

  useEffect(() => {
    const subcats = subcategories?.data?.subcategories.filter(
      (sub: SubCategoryType) => sub.category === selectedCategory._id
    )!;
    setFilteredSubCategories(subcats);
  }, [selectedCategory]);

  useEffect(() => {
    if (action === 'ویرایش' && product) {
      setValue('name', product.name);
      setValue('brand', product.brand);
      setValue('price', product.price);
      setValue('quantity', product.quantity);
      setValue('category', product.category.name);
      setValue('subcategory', product.subcategory.name);
      setValue('description', product.description);
    }
  }, [action]);

  return (
    <div className="mt-8 text-right">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* ورودی نام کالا */}
        <div>
          <label className="block text-sm font-medium">{'نام کالا'}</label>
          <div className="mt-1">
            <input
              type="text"
              {...register('name')}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <small className="text-red-500">
            {errors?.name?.message?.toString()}
          </small>
        </div>
        {/* ورودی برند کالا */}
        <div>
          <label className="block text-sm font-medium">{'برند کالا'}</label>
          <div className="mt-1">
            <input
              type="text"
              {...register('brand')}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <small className="text-red-500">
            {errors?.brand?.message?.toString()}
          </small>
        </div>
        <div className="w-full flex gap-4 md:gap-8">
          {/* ورودی قیمت کالا */}
          <div className="w-1/2 ">
            <label className="block text-sm font-medium text-right">
              {'قیمت'}
            </label>
            <div className="mt-1">
              <input
                type="text"
                {...register('price', { valueAsNumber: true })}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <small className="text-red-500">
              {errors?.price?.message?.toString()}
            </small>
          </div>
          {/* ورودی تعداد کالا */}
          <div className="w-1/2 ">
            <label className="block text-sm font-medium text-right">
              {'تعداد'}
            </label>
            <div className="mt-1">
              <input
                type="number"
                {...register('quantity', { valueAsNumber: true })}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <small className="text-red-500">
              {errors?.quantity?.message?.toString()}
            </small>
          </div>
        </div>
        <div className="w-full flex justify-between gap-4">
          {/* ورودی دسته بندی کالا */}
          <div>
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
                    {categories.data.categories.map(
                      (category: CategoryType) => (
                        <Combobox.Option
                          key={category._id}
                          value={category}
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
                      )
                    )}
                  </Combobox.Options>
                )}
              </div>
            </Combobox>
            <small className="text-red-500">
              {selectedCategory._id === '' &&
                errors?.category?.message?.toString()}
            </small>
          </div>

          {/* ورودی زیردسته بندی کالا */}
          <div>
            <Combobox
              as="div"
              value={selectedSubCategory}
              onChange={setSelectedSubCategory}
            >
              <div className="relative mt-1 w-full">
                <Combobox.Input
                  className="w-full rounded-md border border-gray-300 bg-white py-2 pr-3 pl-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  {...register('subcategory')}
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
                    {filteredSubCategories &&
                      filteredSubCategories.map(
                        (subcategory: SubCategoryType) => (
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
                        )
                      )}
                  </Combobox.Options>
                }
              </div>
            </Combobox>
            <small className="text-red-500">
              {selectedSubCategory._id === '' &&
                errors?.subcategory?.message?.toString()}
            </small>
          </div>
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
                  className="relative h-16 overflow-hidden"
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
          <div className="flex gap-2 overflow-x-auto mt-2">
            {product?.images.map((img) => {
              return (
                <div key={img} className="relative h-16 overflow-hidden">
                  <img
                    src={IMAGES + img}
                    alt=""
                    className="w-full h-full aspect-square"
                  />
                </div>
              );
            })}
          </div>
        </div>
        {/* قسمت دریافت توضیحات */}
        <div className="text-right">
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <ReactQuill
                value={value}
                onChange={onChange}
                placeholder={'توضیحات...'}
                modules={modules}
                className="text-left"
              />
            )}
          />

          <small className="text-red-500">
            {errors?.description?.message?.toString()}
          </small>
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
