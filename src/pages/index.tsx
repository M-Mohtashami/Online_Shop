import { NextPageWithLayout } from '@/interfaces/inretfaces';
import MainLayout from '@/layout/MainLayout';

const Home: NextPageWithLayout = () => {
  return <>home page</>;
};
export default Home;

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
