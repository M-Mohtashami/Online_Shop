import { icons } from '@/config/variable';
import React, { ReactElement } from 'react';

type Props = {
  label: string;
  name: string;
  type: string;
  error?: string | undefined;
  //   className: string;
};

const TextField = ({
  label,
  name,
  type,
  error,
  //   className,
  ...inputProps
}: Props) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          name={name}
          type={type}
          {...inputProps}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <small className="text-red-500">{error}</small>
    </div>
  );
};

export default TextField;
