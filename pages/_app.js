// pages/_app.js
import'@/styles/globals.css';
import React from 'react';
import Layout from './layout';
import Toast from'@/components/Toast';
import useSystemDarkMode from'@/hooks/useSystemDarkMode';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  useSystemDarkMode();

  return (
    <>
      <Head>
        <meta name="color-scheme" content="dark light" />
      </Head>
      <Layout>
        <Component {...pageProps} />
        <Toast />
      </Layout>
    </>
  );
}

export default MyApp;