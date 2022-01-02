import { GoogleAnalyticsEvent } from '../../interfaces/GoogleAnalyticsEvent';

// See:
// https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/lib/gtag.js
// https://panda-program.com/posts/nextjs-google-analytics
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '';

export const existsGaTrackingId = GA_TRACKING_ID !== '';

// log the pageview with their URL.
// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string): void => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// log specific events happening.
// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value = '',
}: GoogleAnalyticsEvent): void => {
  if (!existsGaTrackingId) {
    return;
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label),
    value: value,
  });
};
