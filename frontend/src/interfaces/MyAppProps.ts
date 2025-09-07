import type { EmotionCache } from '@emotion/react';
import type { AppProps } from 'next/app';

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
