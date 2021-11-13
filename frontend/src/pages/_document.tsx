/* eslint-disable react/jsx-props-no-spreading */
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { Children } from 'react';
import PRODUCT_NAME, {
  PRODUCT_DESCRIPTION,
  PRODUCT_URL,
} from '../constants/product-name';
import { TWITTER_USER_NAME } from '../constants/urls';
import theme from '../styles/theme';

// See:
// https://github.com/mui-org/material-ui/tree/next/examples/nextjs
// // https://www.ansonlowzf.com/create-a-website-with-material-ui-v5-nextjs/
const getCache = () => {
  const cache = createCache({ key: 'css', prepend: true });
  cache.compat = true;

  return cache;
};

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang='ja'>
        <Head>
          <meta property='og:site_name' content={PRODUCT_NAME} />
          <meta property='og:title' content={PRODUCT_NAME} />
          <meta property='og:description' content={PRODUCT_DESCRIPTION} />
          <meta property='og:type' content='website' />
          <meta property='og:url' content={PRODUCT_URL} />
          <meta
            property='og:image'
            content={`${PRODUCT_URL}/android-chrome-512x512.png`}
          />

          <meta name='twitter:card' content='summary' />
          <meta name='twitter:site' content={TWITTER_USER_NAME} />
          <meta name='twitter:title' content={PRODUCT_NAME} />
          <meta name='twitter:description' content={PRODUCT_DESCRIPTION} />
          {/* PWA primary color */}
          <meta name='theme-color' content={theme.palette.primary.main} />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
          />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/apple-touch-icon.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/favicon-16x16.png'
          />
          <link rel='manifest' href='/manifest.json' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const originalRenderPage = ctx.renderPage;

  const cache = getCache();
  // HACK: This solution is not good.
  /* eslint-disable-next-line @typescript-eslint/unbound-method */
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      // Take precedence over the CacheProvider in our custom _app.tsx
      // HACK: This solution is not good.
      /* eslint-disable-next-line react/display-name */
      enhanceComponent: (Component) => (props) =>
        (
          <CacheProvider value={cache}>
            <Component {...props} />
          </CacheProvider>
        ),
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags],
  };
};
