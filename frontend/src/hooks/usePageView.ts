import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { existsGaTrackingId, pageview } from '../lib/GoogleAnalytics/gtag';

// See:
// https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_app.js
// https://mariestarck.com/add-google-analytics-to-your-next-js-application-in-5-easy-steps/
// https://panda-program.com/posts/nextjs-google-analytics
export const usePageView = (): void => {
  const router = useRouter();

  useEffect(() => {
    if (!existsGaTrackingId) {
      return;
    }

    const handleRouteChange = (url: string) => {
      pageview(url);
    };

    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
};
