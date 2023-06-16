import Button from '@/components/shared_components/Button';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CategoryType, SubCategoryType } from '@/interfaces/inretfaces';
import { useAddSubCategory } from '@/hooks/category/useAddSubCategory';

type Props = {
  categories: CategoryType[];
  updateCategory: () => void;
};
const SubCategory = ({ categories, updateCategory }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      category: 'Category',
      name: '',
    },
  });
  const { mutate: addSubCategory } = useAddSubCategory({});
  const onSubCategorySubmit = (data: { category: string; name: string }) => {
    addSubCategory(data);
    reset();
  };
  useEffect(() => {
    updateCategory();
  }, []);

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubCategorySubmit)}>
      <div>
        <label
          htmlFor="phone-number"
          className="block text-sm font-medium text-gray-700"
        >
          {'زیر دسته'}
        </label>
        <div className="mt-1 relative rounded-md shadow-sm overflow-hidden border border-gray-200 flex ">
          <div className=" flex items-center bg-light-gray">
            <label htmlFor="category" className="sr-only">
              {'دسته'}
            </label>
            <select
              {...register('category')}
              className="focus:ring-0 focus:border-indigo-500 h-full py-2 pr-3 pl-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
            >
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="text"
            {...register('name')}
            className="appearance-none block w-full pr-4 pl-3 py-2 border-transparent rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
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
  );
};

export default SubCategory;
