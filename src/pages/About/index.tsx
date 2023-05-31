import { NextPageWithLayout } from '@/interfaces/inretfaces';
import MainLayout from '@/layout/MainLayout';
import React, { ReactElement } from 'react';

const About: NextPageWithLayout = () => {
  return <div>About</div>;
};

export default About;

About.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};
