'use client';

import '@/styles/globals.css';
import dynamic from 'next/dynamic';
import Layout from './layout';
import Toast from '@/components/common/Toast';
import useSystemDarkMode from '@/hooks/useSystemDarkMode';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { pageTransition } from '@/utils/motion';
import localFont from 'next/font/local';

const nanum = localFont({
  src: '../public/fonts/NanumSquareNeo-Variable.woff2',
  weight: '300 400 700 800',
  variable: '--font-nanum',
  display: 'block',
  preload: true,
  fallback: ['system-ui', 'sans-serif']
});

const elice = localFont({
  src: '../public/fonts/EliceDigitalCodingverH_Regular.woff2',
  weight: '400',
  variable: '--font-elice',
  display: 'block',
  preload: true,
  fallback: ['monospace']
});

const MotionDiv = dynamic(() => 
  import('framer-motion').then((mod) => mod.motion.div), {
  ssr: false
});

const AnimatePresence = dynamic(() => 
  import('framer-motion').then((mod) => mod.AnimatePresence), {
  ssr: false
});

function SQooL({ Component, pageProps }) {
  useSystemDarkMode();
  const router = useRouter();

  return (
    <main className={`${nanum.variable} ${elice.variable} font-nanum antialiased`}>
      <Layout>
        <AnimatePresence mode="wait" initial={false}>
          <MotionDiv
            key={router.asPath}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
          >
            <Component {...pageProps} />
          </MotionDiv>
        </AnimatePresence>
      </Layout>
      <Toast />
    </main>
  );
}

export default SQooL;