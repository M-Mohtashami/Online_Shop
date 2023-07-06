import { routes } from '@/config/routes';
import { CATEGORY_ICON } from '@/config/variable';
import { CategoryType } from '@/interfaces/inretfaces';
import { classNames } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  category: CategoryType;
  classes?: string;
};
const CategorySection = ({ category, classes = '' }: Props) => {
  return (
    <Link
      href={{
        pathname: routes.public.Category,
        query: {
          category: category._id,
        },
      }}
      className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
    >
      <div className="flex flex-col items-center justify-center gap-3">
        <div
          className={classNames(
            'category-background w-24 h-24 flex items-center justify-center',
            classes
          )}
        >
          <Image
            src={CATEGORY_ICON + category.icon}
            alt={category.slugname}
            className="w-16"
            width={1080}
            height={1080}
          />
        </div>
        <div className="text-links">
          <h3>{category.name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default CategorySection;
