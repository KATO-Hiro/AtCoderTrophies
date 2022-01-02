import { CacheProvider } from '@emotion/react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import Head from 'next/head';
import PropTypes from 'prop-types';

import '../styles/globals.css';
import GoogleAnalytics from '../components/GoogleAnalytics/GoogleAnalytics';
import PRODUCT_NAME from '../constants/product-name';
import { usePageView } from '../hooks/usePageView';
import { MyAppProps } from '../interfaces/MyAppProps';
import Footer from '../parts/Footer/Footer';
import Header from '../parts/Header/Header';
import theme from '../styles/theme';
import createEmotionCache from '../utils/createEmotionCache';

// See:
// https://www.ansonlowzf.com/create-a-website-with-material-ui-v5-nextjs/
// https://github.com/mui-org/material-ui/blob/0620bb0c47c9aa52a863d8ccca5ce7352274bc65/examples/nextjs-with-typescript/src/pages/_app.tsx
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props: MyAppProps): JSX.Element {
  /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  usePageView();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{PRODUCT_NAME}</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <GoogleAnalytics />
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
