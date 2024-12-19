'use client';

import { ReactNode } from 'react';
import Navbar from '@/components/common/NavBar';
import Footer from '@/components/common/Footer';

export default function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar isFullWidth={false} />
      {children}
      <Footer isFullWidth={false} />
    </>
  );
}

