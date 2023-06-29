import { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon, XIcon } from '@heroicons/react/outline';
import deleteProductServices from '@/api/services/product/deleteProduct';
import { useRouter } from 'next/router';
import { routes } from '@/config/routes';
import { AdminOrderType } from '@/interfaces/inretfaces';
import Button from '@/components/shared_components/Button';
import OrderItem from '../order/OrderItem';
import { useUpdateOrder } from '@/hooks/order/useUpdateOrder';

type Props = {
  order?: AdminOrderType;
  closeModal: () => void;
  open: boolean;
};

export default function UpdateOrders({ order, closeModal, open }: Props) {
  const router = useRouter();
  // const { products, user } = order;

  const { mutate: updateOrder } = useUpdateOrder({
    onSuccess: (data) => {
      router.push({
        pathname: router.pathname,
        query: router.query,
      });
      closeModal();
    },
  });

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
            <div className="relative inline-block border border-slate-300 align-bottom bg-white rounded-lg px-4 pt-5 pb-4 shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 overflow-hidden">
              <div className="w-full flex items-center justify-center absolute top-0 left-0 h-12 bg-primary">
                <h3 className="font-normal text-slate-100">{'جزئیات سفارش'}</h3>
                <button
                  type="button"
                  className="absolute top-2 left-2 justify-self-end self-end rounded-full border border-slate-50 bg-slate-100 text-red-600"
                  onClick={() => closeModal()}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              {/* محتوای سفارش */}
              <div className="mt-8 text-right">
                <div className="space-y-6">
                  {/* نام مشتری*/}
                  <div>
                    <span className=" text-sm font-medium">
                      {'نام مشتری : '}
                    </span>
                    <span className=" text-sm font-medium">
                      {order?.user.firstname + ' ' + order?.user.lastname}
                    </span>
                  </div>
                  <div>
                    <span className=" text-sm font-medium">
                      {'آدرس مشتری : '}
                    </span>
                    <span className=" text-sm font-medium">
                      {order?.user.address}
                    </span>
                  </div>
                  <div>
                    <span className=" text-sm font-medium">
                      {'شماره تماس : '}
                    </span>
                    <span className=" text-sm font-medium">
                      {order?.user.phoneNumber}
                    </span>
                  </div>
                  <div>
                    <span className=" text-sm font-medium">
                      {'زمان سفارش : '}
                    </span>
                    <span className=" text-sm font-medium">
                      {new Date(
                        order ? order?.createdAt : ''
                      ).toLocaleDateString('fa-IR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div>
                    <span className=" text-sm font-medium">
                      {'زمان تحویل : '}
                    </span>
                    <span className=" text-sm font-medium">
                      {new Date(
                        order ? order?.delivaryDate : ''
                      ).toLocaleDateString('fa-IR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <ul className="w-full h-44 overflow-y-auto space-y-3">
                    {order?.products.map((product) => (
                      <li key={product._id} className="w-full">
                        <OrderItem item={product} />
                      </li>
                    ))}
                  </ul>

                  <div className="w-full flex items-center justify-center">
                    <Button
                      type="button"
                      variant="contained"
                      onClick={() => {
                        order &&
                          (order?.deliveryStatus
                            ? closeModal()
                            : updateOrder({
                                id: order?._id,
                                order: {
                                  deliveryStatus: true,
                                  products: order?.products.map((item) => {
                                    return {
                                      product: item.product._id,
                                      count: item.count,
                                    };
                                  }),
                                },
                              }));
                      }}
                      className="w-52 bg-primary hover:bg-links"
                    >
                      {order?.deliveryStatus ? 'بستن' : 'تحویل شد'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
