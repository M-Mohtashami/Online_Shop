import { icons } from '@/config/variable';
import React, { ReactElement } from 'react';

type Props = {
  icon: 'forward' | 'backward';
  type: 'button' | 'submit' | 'reset';
  variant: 'contained' | 'outlined';
  className: string;
  children: ReactElement | string;
};

const variants = {
  contained:
    'flex flex-row-reverse gap-3 items-end justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ',
  outlined:
    'p-2 border-2 border-red-500 text-red-500  rounded-full flex items-end gap-3',
};

const Button = ({
  icon = 'forward',
  type = 'button',
  variant = 'contained',
  children,
  className,
  ...btnProps
}: Props) => {
  return (
    <button
      type={type}
      className={variants[variant] + ' ' + className}
      {...btnProps}
    >
      {icons[icon]('')}
      {children}
    </button>
  );
};

export default Button;
