export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!;

// Check if we should track (not in dev/preview)
export const canTrack = () => {
  return (
    typeof window !== 'undefined' &&
    process.env.NODE_ENV === 'production' &&
    process.env.VERCEL_ENV !== 'preview' &&
    GA_TRACKING_ID
  );
};

// Log page views
export const pageview = (url: string) => {
  if (!canTrack()) return;
  
  // Check if gtag is available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// GA4 event tracking
export const event = (eventName: string, parameters: Record<string, any> = {}) => {
  if (!canTrack()) return;
  
  // Check if gtag is available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// Restaurant-specific events
export const trackMenuView = (categoryName: string) => {
  event('view_menu_category', {
    category_name: categoryName,
    engagement_time_msec: Date.now()
  });
};

export const trackContactFormSubmit = () => {
  event('form_submit', {
    form_name: 'contact_form',
    form_location: 'contact_section'
  });
};

export const trackContactFormStart = () => {
  event('form_start', {
    form_name: 'contact_form',
    form_location: 'contact_section'
  });
};

export const trackPhoneClick = () => {
  event('contact_click', {
    contact_method: 'phone',
    link_text: '018-13 18 20'
  });
};

export const trackEmailClick = () => {
  event('contact_click', {
    contact_method: 'email',
    link_text: 'email_address'
  });
};

export const trackAddressClick = () => {
  event('contact_click', {
    contact_method: 'address',
    link_text: 'physical_address'
  });
};

export const trackDeliveryAppClick = (appName: string) => {
  event('external_link_click', {
    link_domain: appName.toLowerCase().replace(' ', ''),
    link_text: appName,
    link_category: 'delivery_app'
  });
};

export const trackLunchTabView = (tabName: string) => {
  event('select_content', {
    content_type: 'lunch_tab',
    item_id: tabName.toLowerCase().replace(' ', '_')
  });
};

export const trackMenuCTAClick = () => {
  event('select_promotion', {
    promotion_id: 'menu_cta',
    promotion_name: 'Menu CTA Hero',
    creative_name: 'hero_section',
    creative_slot: 'primary_cta'
  });
};

export const trackLunchCTAClick = () => {
  event('select_promotion', {
    promotion_id: 'lunch_cta',
    promotion_name: 'Lunch CTA Hero',
    creative_name: 'hero_section',
    creative_slot: 'secondary_cta'
  });
};

export const trackLunchPageCTAClick = () => {
  event('select_promotion', {
    promotion_id: 'lunch_page_cta',
    promotion_name: 'Lunch Page Hero CTA',
    creative_name: 'page_hero',
    creative_slot: 'primary_cta'
  });
};

export const trackLunchOpeningHoursClick = () => {
  event('page_view', {
    page_title: 'Lunch Page',
    page_location: window.location.href,
    referrer_source: 'opening_hours_section'
  });
};

export const trackMenuPageCTAClick = () => {
  event('select_promotion', {
    promotion_id: 'menu_page_cta',
    promotion_name: 'Menu Page Hero CTA',
    creative_name: 'page_hero',
    creative_slot: 'primary_cta'
  });
};