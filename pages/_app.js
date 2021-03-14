import { Fragment } from 'react';
import Head from 'next/head';
import '../styles/font.css';
import '../styles/globals.css';
import '../styles/normalize.css';
import '../styles/main-page.css';
import '../styles/posts.css';

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
