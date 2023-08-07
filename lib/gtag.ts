export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  (<any>window).gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events

interface EventProps {
  action: string;
  category: string;
  label: string;
  value: string;
}

export const event = ({ action, category, label, value }: EventProps) => {
  (<any>window).gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
