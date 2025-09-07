import Script from 'next/script';
import { type ReactElement, useId } from 'react';

import { existsGaTrackingId, GA_TRACKING_ID } from '../../lib/GoogleAnalytics/gtag';

// See:
// https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_app.js
// https://mariestarck.com/add-google-analytics-to-your-next-js-application-in-5-easy-steps/
// https://panda-program.com/posts/nextjs-google-analytics
const GoogleAnalytics = (): ReactElement => {
  const gtagInitId = useId();

  return (
    <>
      {existsGaTrackingId && (
        <>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <Script
            strategy='afterInteractive'
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <Script
            id={gtagInitId}
            strategy='afterInteractive'
            // biome-ignore lint/security/noDangerouslySetInnerHtml: Google Analytics initialization script is trusted content
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </>
      )}
    </>
  );
};

export default GoogleAnalytics;
