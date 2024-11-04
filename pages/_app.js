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


function MyApp({ Component, pageProps }) {
  useSystemDarkMode();
  const router = useRouter();

  return (
    <>
      <Head>
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1"
        />
      </Head>
      <Layout className={`${nanum.variable} font-suit antialiased`}>
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
        <Toast />
      </Layout>
    </>
  );
}

export default MyApp;