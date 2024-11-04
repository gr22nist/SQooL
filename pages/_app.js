'use client';

import '@/styles/globals.css';
import { AnimatePresence, motion } from 'framer-motion';
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

function SQooL({ Component, pageProps }) {
  useSystemDarkMode();
  const router = useRouter();

  return (
    <main className={`${nanum.variable} ${elice.variable} font-nanum antialiased`}>
      <Layout>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={router.asPath}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Layout>
      <Toast />
    </main>
  );
}

export default SQooL;