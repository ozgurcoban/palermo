export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!;

// Check if we should track (not in dev/preview)
export const canTrack = () => {
  return (
    typeof window !== 'undefined' &&
    process.env.NODE_ENV === 'production' &&
    // Only check VERCEL_ENV if it exists
    (!process.env.VERCEL_ENV || process.env.VERCEL_ENV !== 'preview') &&
    GA_TRACKING_ID
  );
};

// Log page views
export const pageview = (url: string) => {
  if (!canTrack()) {
    return;
  }
  
  // Check if gtag is available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  } else if (process.env.NODE_ENV === 'production') {
    console.warn('[GA] gtag not available for pageview');
  }
};

// Log specific events
type GTagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

export const event = ({ action, category, label, value }: GTagEvent) => {
  if (!canTrack()) {
    return;
  }
  
  // Check if gtag is available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  } else if (process.env.NODE_ENV === 'production') {
    console.warn('[GA] gtag not available for event:', { action, category });
  }
};

// Restaurant-specific events
export const trackMenuView = (categoryName: string) => {
  event({
    action: 'view_menu_category',
    category: 'engagement',
    label: categoryName,
  });
};

export const trackContactFormSubmit = () => {
  event({
    action: 'submit_form',
    category: 'contact',
    label: 'contact_form',
  });
};

export const trackContactFormStart = () => {
  event({
    action: 'start_form',
    category: 'contact',
    label: 'contact_form',
  });
};

export const trackPhoneClick = () => {
  event({
    action: 'click',
    category: 'contact',
    label: 'phone_number',
  });
};

export const trackEmailClick = () => {
  event({
    action: 'click',
    category: 'contact',
    label: 'email_address',
  });
};

export const trackAddressClick = () => {
  event({
    action: 'click',
    category: 'contact',
    label: 'physical_address',
  });
};

export const trackDeliveryAppClick = (appName: string) => {
  event({
    action: 'click',
    category: 'delivery',
    label: appName,
  });
};

export const trackLunchTabView = (tabName: string) => {
  event({
    action: 'view_lunch_tab',
    category: 'engagement',
    label: tabName,
  });
};

export const trackMenuCTAClick = () => {
  event({
    action: 'click',
    category: 'cta',
    label: 'menu_cta_hero',
  });
};

export const trackLunchCTAClick = () => {
  event({
    action: 'click',
    category: 'cta',
    label: 'lunch_cta_hero',
  });
};

export const trackLunchPageCTAClick = () => {
  event({
    action: 'click',
    category: 'cta',
    label: 'lunch_page_hero_cta',
  });
};

export const trackLunchOpeningHoursClick = () => {
  event({
    action: 'click',
    category: 'navigation',
    label: 'lunch_from_opening_hours',
  });
};

export const trackMenuPageCTAClick = () => {
  event({
    action: 'click',
    category: 'cta',
    label: 'menu_page_hero_cta',
  });
};