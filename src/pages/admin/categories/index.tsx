import { ReactElement, useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import { classNames } from '@/utils';
import { NextPageWithLayout } from '@/interfaces/inretfaces';
import AdminLayout from '@/layout/AdminLayout';
import Button from '@/components/shared_components/Button';
import { useForm } from 'react-hook-form';
import { useAddCategory } from '@/hooks/category/useAddCategory';
import addCategoryService from '@/api/services/category/addCategoryService';
import SubCategory from '@/components/AdminPanel/SubCategory';
import { useGetCategories } from '@/hooks/category/useGetCategories';

const Categories: NextPageWithLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      category: '',
    },
  });
  const { mutate: addCategory } = useAddCategory({});
  const { data, isSuccess, refetch } = useGetCategories({});
  const onCategorySubmit = (data: { category: string }) => {
    const formData = new FormData();
    formData.append('name', data.category);
    addCategory(formData);
    reset();
  };
  let [categories] = useState(['دسته‌بندی', 'زیردسته']);
  const updateCategory = () => {
    refetch();
  };

  return (
    <div className="w-full max-w-md px-2 py-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-links/50 p-1">
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-primary',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-links hover:bg-white/[0.12] hover:text-secondery'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel
            key={0}
            className={classNames(
              'rounded-xl bg-white p-3',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
            )}
          >
            <form
              className="space-y-6"
              onSubmit={handleSubmit(onCategorySubmit)}
            >
              <div>
                <label className="block text-sm font-medium">
                  {'نام دسته'}
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    {...register('category', {
                      required: 'نام دسته اجباری است',
                    })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <small className="text-red-500">
                  {errors.category?.message}
                </small>
              </div>
              <div>
                <Button
                  icon="forward"
                  type="submit"
                  variant="contained"
                  className="w-full bg-primary hover:bg-links"
                >
                  {'ذخیره'}
                </Button>
              </div>
            </form>
          </Tab.Panel>
          <Tab.Panel
            key={1}
            className={classNames(
              'rounded-xl bg-white p-3',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
            )}
          >
            {isSuccess && (
              <SubCategory
                categories={data?.data.categories}
                updateCategory={updateCategory}
              />
            )}
            {/* {form} */}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

Categories.getLayout = (page: ReactElement) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Categories;
