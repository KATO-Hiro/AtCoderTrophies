// See:
// https://panda-program.com/posts/nextjs-google-analytics
type ClickEvent = {
  action: 'click';
  category: 'other';
};

export type GoogleAnalyticsEvent = ClickEvent & {
  label?: Record<string, string | number | boolean> | string;
  value?: string;
};
