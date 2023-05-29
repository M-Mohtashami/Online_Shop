import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

type LayoutProps = {
  children: React.ReactNode;
};
