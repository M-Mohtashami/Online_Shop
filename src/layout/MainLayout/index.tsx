import MainFooter from '@/components/MainLayout/MainFooter';
import MainHeader from '@/components/MainLayout/MainHeader';
import { LayoutProps } from '@/interfaces/inretfaces';
import store from '@/redux/store';
import React from 'react';
import { Provider } from 'react-redux';
import persistStore from 'redux-persist/lib/persistStore';
import { PersistGate } from 'redux-persist/integration/react';

type Props = {
  children: React.ReactElement;
};

let persistor = persistStore(store);

const MainLayout = ({ children }: Props) => {
  const { props } = children;
  // console.log(children);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className="max-w-[1440px] w-full h-full flex flex-col font-iran-sans ">
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
      </PersistGate>
    </Provider>
  );
};

export default MainLayout;
