import PropTypes from 'prop-types';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import '../styles/globals.css';
import theme from '../styles/theme';

// See:
// https://github.com/mui-org/material-ui/tree/next/examples/nextjs
// https://www.ansonlowzf.com/create-a-website-with-material-ui-v5-nextjs/
const cache = createCache({ key: 'css' });
cache.compat = true;

/* eslint-disable react/jsx-props-no-spreading */
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <CacheProvider value={cache}>
      <Head>
        <title>AtCoder Trophies</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
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
