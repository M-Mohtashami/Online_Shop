import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Logout = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/');
  }, []);
  return <div>Logout</div>;
};

export default Logout;
