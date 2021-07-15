import { AppProps } from 'next/app';

import '../../styles/globals.css';

/* eslint-disable react/jsx-props-no-spreading */
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default MyApp;
