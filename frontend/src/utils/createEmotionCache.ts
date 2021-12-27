import createCache, { EmotionCache } from '@emotion/cache';

// See:
// https://github.com/mui-org/material-ui/blob/0620bb0c47c9aa52a863d8ccca5ce7352274bc65/examples/nextjs-with-typescript/src/utils/createEmotionCache.ts
export default function createEmotionCache(): EmotionCache {
  return createCache({ key: 'css' });
}
