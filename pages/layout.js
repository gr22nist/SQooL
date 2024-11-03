import React from 'react';
import Head from 'next/head';
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';
import useStore from '@/store/useStore';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const isFullWidth = useStore((state) => state.isFullWidth);
  const router = useRouter();

  const shouldShowFooter = router.pathname !== "/start";
  const useFullHeight = router.pathname === "/start" || router.pathname === "/editor" || router.pathname === "/404";
  const isMainPage = router.pathname === "/";
  const applyNavPadding = router.pathname !== "/";

  const containerClass = `
    font-body 
    tracking-wide
    ${isMainPage ? '' : 'min-h-screen'}
    ${useFullHeight ? 'h-screen' : ''}
    ${isFullWidth ? 'w-full' : ''}
    ${applyNavPadding ? 'pt-nav' : ''}
  `;

  return (
    <div className={containerClass}>
      <Head>
        <title>WISE SQooL</title>
        <meta name="description" content="한글 데이터로 배우는 마음 편한 SQLite!" />
        <meta property="og:title" content="SQooL" />
        <meta property="og:description" content="한글 데이터로 배우는 마음 편한 SQLite!" />
        <meta property="og:image" content="/img/wise-meta-img.jpg" />
        <meta property="og:url" content="https://sqool.kr" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SQooL" />
        <meta name="twitter:description" content="한글 데이터로 배우는 마음 편한 SQLite!" />
        <meta name="twitter:image" content="/img/wise-meta-img-tw.jpg" />
      </Head>
      <Navbar isFullWidth={isFullWidth} />
      <main className="h-full pb-10">
        {children}
      </main>
      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default Layout;