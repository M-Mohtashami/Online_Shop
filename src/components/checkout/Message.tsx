import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon, XIcon } from '@heroicons/react/outline';
import { ProductType } from '@/interfaces/inretfaces';
import deleteProductServices from '@/api/services/product/deleteProduct';
import { useRouter } from 'next/router';
import { routes } from '@/config/routes';
import { classNames } from '@/utils';

type Props = {
  status?: string;
  closeModal: () => void;
  open: boolean;
};

export default function Message({ status, closeModal, open }: Props) {
  const router = useRouter();
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-links bg-opacity-20 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="flex flex-col gap-6  items-center justify-start mb-16">
                <div
                  className={classNames(
                    status === 'success' ? 'bg-green-100' : 'bg-red-100 ',
                    'mx-auto flex-shrink-0 flex items-center justify-center rounded-full p-4'
                  )}
                >
                  <ExclamationIcon
                    className={classNames(
                      status === 'success' ? 'text-green-600' : 'text-red-600 ',
                      'h-36 w-36 '
                    )}
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:mr-4 sm:text-right">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900 truncate"
                  >
                    {status === 'success'
                      ? 'عملیات پرداخت با موفقیت انجام شد'
                      : 'عملیات پرداخت با موفقیت انجام نشد'}
                  </Dialog.Title>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 mt-5 sm:mt-4 sm:flex sm:justify-center bg-gray-100 w-full py-3 px-6">
                {status === 'success' ? (
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      router.push({
                        pathname: routes.public.Home,
                      });
                      closeModal();
                    }}
                  >
                    {'بازگشت به خانه'}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      router.push({
                        pathname: routes.public.Checkout,
                      });
                      closeModal();
                    }}
                  >
                    {'تلاش مجدد'}
                  </button>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
