import MainFooter from '@/components/MainLayout/MainFooter';
import MainHeader from '@/components/MainLayout/MainHeader';
import { LayoutProps } from '@/interfaces/inretfaces';
import store from '@/redux/store';
import React from 'react';
import { Provider } from 'react-redux';
import persistStore from 'redux-persist/lib/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

type Props = {
  children: React.ReactElement;
};

let persistor = persistStore(store);

const queryClient = new QueryClient();

const MainLayout = ({ children }: Props) => {
  const { props } = children;
  // console.log(children);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <div className="max-w-[1440px] w-full h-full flex flex-col justify-between font-iran-sans ">
            <MainHeader
              categories={props.categories}
              subcategories={props.subcategories}
            />
            <main className="flex-1 p-6 w-full mt-16 ">{children}</main>
            <MainFooter
              categories={props.categories}
              subcategories={props.subcategories}
            />
          </div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          {/* Same as */}
          <ToastContainer />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
};

export default MainLayout;
