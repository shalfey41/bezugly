import { Fragment } from 'react';
import Head from 'next/head';
import 'normalize.css';

import '../styles/font.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
