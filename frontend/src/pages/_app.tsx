import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

import '../styles/globals.css';
import PRODUCT_NAME from '../constants/product-name';
import Footer from '../parts/Footer/Footer';
import Header from '../parts/Header/Header';
import theme from '../styles/theme';

// See:
// https://github.com/mui-org/material-ui/tree/next/examples/nextjs
// https://www.ansonlowzf.com/create-a-website-with-material-ui-v5-nextjs/
const cache = createCache({ key: 'css' });
cache.compat = true;

/* eslint-disable react/jsx-props-no-spreading */
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <CacheProvider value={cache}>
      <Head>
        <title>{PRODUCT_NAME}</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  /* eslint-disable-next-line react/forbid-prop-types */
  pageProps: PropTypes.object.isRequired,
};
