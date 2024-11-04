'use client';

import '@/styles/globals.css';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './layout';
import Toast from '@/components/common/Toast';
import useSystemDarkMode from '@/hooks/useSystemDarkMode';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { pageTransition } from '@/utils/motion';

function MyApp({ Component, pageProps }) {
  useSystemDarkMode();
  const router = useRouter();

  return (
    <>
      <Head>
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Head>
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
        <Toast />
      </Layout>
    </>
  );
}

export default MyApp;