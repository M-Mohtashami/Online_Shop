import { icons } from '@/config/variable';
import React, { ReactElement } from 'react';

type Props = {
  icon: 'forward' | 'backward' | 'addtocart';
  type: 'button' | 'submit' | 'reset';
  variant: 'contained' | 'outlined';
  className: string;
  children: ReactElement | string;
  iconClassName?: string;
  [key: string]: any;
};

const variants = {
  contained:
    'flex flex-row-reverse gap-3 items-end justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ',
  outlined: 'p-2 border-2 rounded-full flex items-end gap-3',
};

const Button = ({
  icon = 'forward',
  type = 'button',
  variant = 'contained',
  children,
  className,
  iconClassName = '',
  ...btnProps
}: Props) => {
  return (
    <button
      type={type}
      className={variants[variant] + ' ' + className}
      {...btnProps}
    >
      {icons[icon](iconClassName)}
      {children}
    </button>
  );
};

export default Button;
