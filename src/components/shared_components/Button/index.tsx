import { icons } from '@/config/variable';
import React, { ReactElement } from 'react';

type Props = {
  icon: 'forward' | 'backward';
  type: 'button' | 'submit' | 'reset';
  //   variant: 'contained' | 'outlined' | 'icon';
  className: string;
  children: ReactElement | string;
};

const Button = ({
  icon = 'forward',
  type = 'button',
  children,
  className,
  ...btnProps
}: Props) => {
  return (
    <button type={type} className={className} {...btnProps}>
      {icons[icon]('')}
      {children}
    </button>
  );
};

export default Button;
