export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!;

// Debug mode check
const isDebugMode = () => {
  if (typeof window !== "undefined") {
    return window.location.search.includes('ga_debug=true');
  }
  return false;
};

// Check if we should track (only in production with analytics consent)
export const canTrack = () => {
  // Always allow in debug mode
  if (isDebugMode()) {
    console.info('[GA] Debug mode active - tracking enabled');
    return true;
  }

  if (
    typeof window === "undefined" ||
    !GA_TRACKING_ID ||
    (process.env.NODE_ENV !== "production" && !isDebugMode()) ||
    process.env.VERCEL_ENV === "preview"
  ) {
    return false;
  }

  // Check for analytics consent
  try {
    const consent = localStorage.getItem("cookie-consent");
    if (consent) {
      const consentData = JSON.parse(consent);
      return consentData.analytics === true;
    }
  } catch (error) {
    console.error("[GA] Error checking consent:", error);
  }

  return false;
};

// GA4 event tracking
export const event = (
  eventName: string,
  parameters: Record<string, any> = {},
) => {
  if (!canTrack()) {
    if (isDebugMode()) {
      console.info(`[GA] Event blocked (no consent): ${eventName}`, parameters);
    }
    return;
  }

  // Check if gtag is available
  if (typeof window !== "undefined" && window.gtag) {
    if (isDebugMode()) {
      console.info(`[GA] Sending event: ${eventName}`, parameters);
    }
    window.gtag("event", eventName, parameters);
  } else {
    if (isDebugMode() || process.env.NODE_ENV === 'development') {
      console.warn('[GA] gtag not available - event not sent:', eventName);
    }
  }
};

// Restaurant-specific events
export const trackMenuView = (categoryName: string) => {
  event("view_item_list", {
    item_list_id: "menu",
    item_list_name: categoryName,
    items: [{ item_category: categoryName }],
  });
};

export const trackContactFormSubmit = () => {
  event("form_submit", {
    form_name: "contact",
    form_destination: "email",
  });
};

export const trackContactFormStart = () => {
  event("form_start", {
    form_name: "contact",
    form_destination: "email",
  });
};

export const trackPhoneClick = () => {
  event("click", {
    link_id: "phone_number",
    link_text: "Phone",
    link_domain: "tel",
    link_classes: "contact_phone",
    outbound: false,
  });
};

export const trackEmailClick = () => {
  event("click", {
    link_id: "email_address",
    link_text: "Email",
    link_domain: "mailto",
    link_classes: "contact_email",
    outbound: false,
  });
};

export const trackAddressClick = () => {
  event("click", {
    link_id: "physical_address",
    link_text: "Address",
    link_url: "https://maps.google.com",
    link_classes: "contact_address",
    outbound: true,
  });
};

export const trackDeliveryAppClick = (appName: string) => {
  event("click", {
    link_id: `delivery_app_${appName.toLowerCase().replace(/\s+/g, "_")}`,
    link_text: appName,
    link_url: `${appName.toLowerCase()}.com`,
    link_classes: "delivery_app",
    outbound: true,
    custom_parameter: {
      app_name: appName,
      conversion_event: true,
    },
  });
};

export const trackLunchTabView = (tabName: string) => {
  event("select_content", {
    content_type: "lunch_tab",
    content_id: tabName.toLowerCase().replace(" ", "_"),
    item_list_name: "lunch_menu",
  });
};

export const trackHomeHeroMenuClick = () => {
  event("click", {
    link_id: "hero_menu_cta",
    link_text: "View Menu",
    link_url: "#menu",
    link_classes: "cta_button hero",
    outbound: false,
  });
};

export const trackLunchCTAClick = () => {
  event("click", {
    link_id: "hero_lunch_cta",
    link_text: "View Lunch",
    link_url: "/lunch",
    link_classes: "cta_button hero",
    outbound: false,
  });
};

export const trackLunchPageCTAClick = () => {
  event("click", {
    link_id: "lunch_page_cta",
    link_text: "View Lunch Menu",
    link_url: "#lunch",
    link_classes: "cta_button lunch_page",
    outbound: false,
  });
};

export const trackLunchOpeningHoursClick = () => {
  event("click", {
    link_id: "contact_lunch_hours",
    link_text: "Lunch Opening Hours",
    link_url: "/lunch",
    link_classes: "contact_lunch_link",
    outbound: false,
  });
};

export const trackMenuPageCTAClick = () => {
  event("click", {
    link_id: "menu_page_cta",
    link_text: "View Menu",
    link_url: "#menu",
    link_classes: "cta_button menu_page",
    outbound: false,
  });
};

export const trackThemeToggle = (fromTheme: string, toTheme: string) => {
  event("theme_change", {
    from_theme: fromTheme,
    to_theme: toTheme,
    method: "toggle_button",
  });
};

export const trackNavbarContactClick = () => {
  event("click", {
    link_id: "navbar_contact_cta",
    link_text: "Contact",
    link_url: "#contact",
    link_classes: "cta_button navbar",
    outbound: false,
  });
};

export const trackFAQClick = (index: number) => {
  event("select_content", {
    content_type: "faq",
    content_id: `faq_question_${index + 1}`,
    item_list_name: "faq_list",
  });
};

export const trackSocialClick = (platform: string, location?: string) => {
  event("click", {
    link_id: `social_${platform}`,
    link_text: platform,
    link_url: `${platform}.com`,
    link_classes: `social_link ${location || "unknown"}`,
    outbound: true,
    custom_parameter: {
      platform: platform,
      location: location || "unknown",
    },
  });
};

export const trackFAQCTAClick = (
  faqIndex: number,
  ctaType: string,
  destination: string,
) => {
  event("click", {
    link_id: `faq_cta_${faqIndex + 1}`,
    link_text: ctaType,
    link_url: destination,
    link_classes: "faq_cta",
    outbound: destination.startsWith("http"),
    custom_parameter: {
      faq_index: faqIndex,
      cta_type: ctaType,
    },
  });
};

export const trackMobileBottomNavClick = (
  destination: string,
  label: string,
  fromPage: string,
) => {
  event("click", {
    link_id: "mobile_bottom_nav",
    link_text: label,
    link_url: destination,
    link_classes: "mobile_navigation",
    outbound: false,
    custom_parameter: {
      from_page: fromPage,
      navigation_method: "mobile_bottom_bar",
    },
  });
};

// Cookie consent tracking - Special handling for consent events
// These events are important for compliance and should be tracked
// even before full analytics consent, using GA's consent mode
export const trackCookieConsent = (
  action: "accept_all" | "reject_all" | "accept_selected",
  analyticsEnabled?: boolean,
) => {
  // Always try to send consent events if gtag exists
  // GA Consent Mode will handle them appropriately based on consent state
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "cookie_consent", {
      consent_action: action,
      analytics_consent:
        analyticsEnabled !== undefined
          ? analyticsEnabled
          : action === "accept_all",
      consent_method: "banner",
    });

    // Update GA consent state based on the user's choice
    if (
      action === "accept_all" ||
      (action === "accept_selected" && analyticsEnabled)
    ) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    } else {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
      });
    }
  }
};

export const trackCookieSettingsOpen = () => {
  // Only track if user has already consented
  event("view_item", {
    item_id: "cookie_settings",
    item_name: "Cookie Settings Dialog",
    item_category: "privacy",
  });
};
