import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Navbar from '@/components/common/NavBar';
import Footer from '@/components/common/Footer';
import useStore from '@/store/useStore';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const isFullWidth = useStore((state) => state.isFullWidth);
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  const isLargeScreen = useCallback(() => {
    return window.innerWidth >= 1024;
  }, []);

  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
      setIsLarge(window.innerWidth >= 1024);
    };
    
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const shouldShowFooter = router.pathname !== "/start";
  const isEditorPage = router.pathname === "/editor";
  const useFullHeight = router.pathname === "/start" || router.pathname === "/404";
  const isMainPage = router.pathname === "/";
  const applyNavPadding = router.pathname !== "/";

  const containerClass = `
    font-body 
    tracking-wide
    flex flex-col

    ${useFullHeight ? 'h-screen' : ''}
    ${isFullWidth ? 'w-full' : ''}
    ${applyNavPadding ? 'pt-nav' : ''}
  `;

  const mainClass = `
    flex-1
    ${isEditorPage ? 'mb-12' : ''}
    ${!isMainPage && !isEditorPage && !useFullHeight 
      ? 'pt-4 sm:pt-6'
      : ''}
  `;

  const footerClass = `
    w-full
    ${isMobile 
      ? 'mt-auto' 
      : isEditorPage 
        ? 'relative mt-auto border-t dark:border-slate-800' 
        : 'mt-auto'}
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
      <main className={mainClass}>
        {children}
      </main>
      {shouldShowFooter && (
        <footer className={footerClass}>
          <Footer />
        </footer>
      )}
    </div>
  );
};

export default Layout;