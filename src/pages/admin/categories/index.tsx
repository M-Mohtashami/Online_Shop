import { ReactElement, useState } from 'react';
import { Tab } from '@headlessui/react';
import { classNames } from '@/utils';
import { NextPageWithLayout } from '@/interfaces/inretfaces';
import AdminLayout from '@/layout/AdminLayout';
import Button from '@/components/shared_components/Button';
import { useForm } from 'react-hook-form';

const Categories: NextPageWithLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let [categories] = useState({
    ['دسته‌بندی']: (
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium">{'نام دسته'}</label>
          <div className="mt-1">
            <input
              type="text"
              {...register('category', { required: 'نام دسته اجباری است' })}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <small className="text-red-500">{errors.category?.message}</small>
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
    ),
    ['زیردسته']: (
      <form className="space-y-6">
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
    ),
  });

  return (
    <div className="w-full max-w-md px-2 py-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-links/50 p-1">
          {Object.keys(categories).map((category) => (
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
          {Object.values(categories).map((form, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              {form}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

Categories.getLayout = (page: ReactElement) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Categories;
