import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import '../../styles/globals.css';

/* eslint-disable react/jsx-props-no-spreading */
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
