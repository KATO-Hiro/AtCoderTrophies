import { EmotionCache } from '@emotion/react';
import { AppProps } from 'next/app';

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
