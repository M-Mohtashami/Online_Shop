import React, { ReactElement } from 'react';

type Props = {
  label: string;
  type: string;
  error?: string | undefined;
  //   className: string;
  controller: any;
  [key: string]: any;
};

const TextField = ({
  label,
  type,
  error,
  controller,
  //   className,
  ...inputProps
}: Props) => {
  console.log(error);

  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <div className="mt-1">
        <input
          type={type}
          {...controller}
          {...inputProps}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <small className="text-red-500">{error}</small>
    </div>
  );
};

export default TextField;
