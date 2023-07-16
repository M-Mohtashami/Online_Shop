import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon, XIcon } from '@heroicons/react/outline';
import { ProductType } from '@/interfaces/inretfaces';
import deleteProductServices from '@/api/services/product/deleteProduct';
import AddNewProduct from '@/components/AdminPanel/Form/AddNewProduct';

type Props = {
  product: ProductType | undefined;
  closeModal: () => void;
  open: boolean;
};

const AddModal = ({ product, closeModal, open }: Props) => {
  const [action, setAction] = useState('افزودن');
  console.log(product);

  useEffect(() => {
    product ? setAction('ویرایش') : setAction('افزودن');
  }, [product]);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 font-iran-sans overflow-y-auto"
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
            <div className="relative inline-block border border-slate-300 align-bottom bg-white rounded-lg px-4 pt-5 pb-4 shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="w-full flex items-center justify-center absolute top-0 left-0 h-12 bg-primary">
                <h3 className="font-normal text-slate-100">
                  {` فرم ${action} کالا`}
                </h3>
                <button
                  type="button"
                  className="absolute top-2 left-2 justify-self-end self-end rounded-full border border-slate-50 bg-slate-100 text-red-600"
                  onClick={() => closeModal()}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <AddNewProduct
                action={action}
                product={product}
                closeModal={closeModal}
              />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AddModal;
