export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!;

// Check if we should track (not in dev/preview)
export const canTrack = () => {
  return (
    typeof window !== "undefined" &&
    GA_TRACKING_ID &&
    (process.env.NODE_ENV === "production" ||
      process.env.NODE_ENV === "development") &&
    process.env.VERCEL_ENV !== "preview"
  );
};

// Log page views
export const pageview = (url: string) => {
  if (!canTrack()) return;

  // Check if gtag is available
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// GA4 event tracking
export const event = (
  eventName: string,
  parameters: Record<string, any> = {},
) => {
  if (!canTrack()) return;

  // Check if gtag is available
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, parameters);
  }
};

// Restaurant-specific events
export const trackMenuView = (categoryName: string) => {
  event("view_menu_category", {
    category_name: categoryName,
    engagement_time_msec: Date.now(),
  });
};

export const trackContactFormSubmit = () => {
  event("form_submitted", {
    event_category: "Form",
    event_label: "Contact Form Sent",
    form_type: "contact"
  });
};

export const trackContactFormStart = () => {
  event("form_started", {
    event_category: "Form", 
    event_label: "Contact Form Begun",
    form_type: "contact"
  });
};

export const trackPhoneClick = () => {
  event("phone_clicked", {
    event_category: "Contact",
    event_label: "Phone Number",
    contact_method: "phone"
  });
};

export const trackEmailClick = () => {
  event("email_clicked", {
    event_category: "Contact",
    event_label: "Email Address",
    contact_method: "email"
  });
};

export const trackAddressClick = () => {
  event("address_clicked", {
    event_category: "Contact",
    event_label: "Physical Address",
    contact_method: "address"
  });
};

export const trackDeliveryAppClick = (appName: string) => {
  event(`${appName.toLowerCase().replace(/\s+/g, "_")}_clicked`, {
    event_category: "External Link",
    event_label: `${appName} Delivery App`,
    app_name: appName,
    link_domain: appName.toLowerCase().replace(" ", ""),
    conversion_event: true,
    outbound_link: true,
  });
};

export const trackLunchTabView = (tabName: string) => {
  event("select_content", {
    content_type: "lunch_tab",
    item_id: tabName.toLowerCase().replace(" ", "_"),
  });
};

export const trackMenuCTAClick = () => {
  event("hero_menu_click", {
    event_category: "CTA",
    event_label: "Menu - Hero",
    action: "scroll_to_menu"
  });
};

export const trackLunchCTAClick = () => {
  event("hero_lunch_click", {
    event_category: "CTA",
    event_label: "Lunch - Hero",
    action: "navigate_to_lunch"
  });
};

export const trackLunchPageCTAClick = () => {
  event("lunch_page_cta_click", {
    event_category: "CTA",
    event_label: "Lunch Page Hero CTA",
    action: "scroll_to_lunch"
  });
};

export const trackLunchOpeningHoursClick = () => {
  event("lunch_hours_click", {
    event_category: "Contact",
    event_label: "Lunch Hours",
    action: "view_info"
  });
};

export const trackMenuPageCTAClick = () => {
  event("menu_page_cta_click", {
    event_category: "CTA",
    event_label: "Menu Page Hero CTA",
    action: "book_table"
  });
};

export const trackThemeToggle = (fromTheme: string, toTheme: string) => {
  event(`theme_${toTheme}`, {
    event_category: "UI",
    event_label: `${fromTheme} → ${toTheme}`,
    from_theme: fromTheme,
    to_theme: toTheme
  });
};

export const trackFAQClick = (index: number) => {
  event(`faq_${index + 1}`, {
    event_category: 'Content',
    event_label: `FAQ Question ${index + 1}`,
    faq_index: index
  });
};

export const trackSocialClick = (platform: string) => {
  event(`${platform}_clicked`, {
    event_category: 'Social',
    event_label: `${platform} Link`,
    platform: platform
  });
};

export const trackScrollDepth = (percentage: number, pageName: string) => {
  event(`scroll_${percentage}_${pageName}`, {
    event_category: 'Engagement',
    event_label: `${pageName} - ${percentage}%`,
    scroll_depth: percentage,
    page_name: pageName
  });
};
