import { NextPageWithLayout } from '@/interfaces/inretfaces';
import MainLayout from '@/layout/MainLayout';
import React, { ReactElement } from 'react';

const Contact: NextPageWithLayout = () => {
  return <div>Contact</div>;
};

export default Contact;

Contact.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};
