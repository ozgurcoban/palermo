import { Metadata } from "next";

export const siteConfig = {
  name: "Restaurang Palermo",
  url: "https://palermo-uppsala.se",
  ogImage: "/hero.webp",
  links: {
    facebook: "https://www.facebook.com/profile.php?id=100046443356150",
    instagram: "https://www.instagram.com/palermo_uppsala",
  },
  address: {
    streetAddress: "Sysslomansgatan 7",
    addressLocality: "Uppsala",
    postalCode: "753 11",
    addressCountry: "SE",
  },
  geo: {
    latitude: "59.86000407477078",
    longitude: "17.63056091412946",
  },
  openingHours: {
    Monday: "11:00-01:00",
    Tuesday: "11:00-03:00",
    Wednesday: "11:00-03:00",
    Thursday: "11:00-03:00",
    Friday: "11:00-03:00",
    Saturday: "12:00-03:00",
    Sunday: "12:00-01:00",
  },
  priceRange: "$",
  telephone: "+4618131820",
  email: "info@palermo-uppsala.se",
};

// Platform detection
const isNetlify =
  process.env.NETLIFY === "true" ||
  process.env.NETLIFY === "1" ||
  !!process.env.NETLIFY_BUILD_BASE ||
  !!process.env.DEPLOY_URL ||
  (process.env.URL && process.env.URL.includes("netlify"));
const isVercel = process.env.VERCEL === "1";

// Netlify is ALWAYS preview/noindex for this project
// Only Vercel production (main branch) should be indexed
const isDevelopment =
  process.env.NODE_ENV === "development" ||
  isNetlify || // Netlify is always preview
  (isVercel && process.env.VERCEL_ENV !== "production") || // Vercel non-production
  (isVercel && process.env.VERCEL_GIT_COMMIT_REF !== "main"); // Vercel non-main branch

type MetadataConfig = {
  title: string;
  description: string;
  locale: string;
  image?: string;
  noIndex?: boolean;
};

export function constructMetadata({
  title,
  description,
  locale,
  image = siteConfig.ogImage,
  noIndex = false,
}: MetadataConfig): Metadata {
  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "sv" ? "sv_SE" : "en_US",
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - ${description}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [image],
    },
    robots:
      noIndex || isDevelopment
        ? {
            index: false,
            follow: false,
            googleBot: {
              index: false,
              follow: false,
            },
          }
        : {
            index: true,
            follow: true,
            googleBot: {
              index: true,
              follow: true,
              "max-video-preview": -1,
              "max-image-preview": "large",
              "max-snippet": -1,
            },
          },
    alternates: {
      languages: {
        en: "/en",
        sv: "/sv",
      },
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

// Helper function for JSON-LD structured data
export function generateRestaurantSchema(locale: "sv" | "en") {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": siteConfig.url,
    name: siteConfig.name,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    url: siteConfig.url,
    telephone: siteConfig.telephone,
    email: siteConfig.email,
    priceRange: siteConfig.priceRange,
    address: {
      "@type": "PostalAddress",
      ...siteConfig.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      ...siteConfig.geo,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday"],
        opens: "11:00",
        closes: "01:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "11:00",
        closes: "03:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "12:00",
        closes: "03:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "12:00",
        closes: "01:00",
      },
    ],
    servesCuisine: ["Pizza", "Swedish", "Pub Food", "European"],
    menu: `${siteConfig.url}/${locale}/menu`,
    acceptsReservations: "False",
    sameAs: [siteConfig.links.facebook, siteConfig.links.instagram],
  };
}

// FAQ data that can be used both for schema and UI
export function getFAQData(
  locale: "sv" | "en",
  openingHours?: string,
  lunchInfo?: string,
) {
  return locale === "sv"
    ? [
        {
          question: "Vad kostar lunchen på Palermo?",
          answer:
            lunchInfo ||
            "Vardagslunch kostar från 119 kr och serveras vardagar 11:00-15:00. I priset ingår huvudrätt, sallad, bröd och kaffe. Välj mellan 9 olika rätter eller 24st lunchpizza.",
        },
        {
          question: "Vilka öppettider har Palermo Uppsala?",
          answer:
            openingHours ||
            "Vi har öppet alla dagar!\nMåndag: 11:00-01:00\nTisdag-Fredag: 11:00-03:00\nLördag: 12:00-03:00\nSöndag: 12:00-01:00",
        },
        {
          question: "Kan man beställa hemkörning?",
          answer:
            "Absolut! Du hittar oss på Uber Eats, Foodora och Wolt. Perfekt när du vill njuta av Palermos mat hemma i soffan. Vi levererar över hela Uppsala.",
        },
        {
          question: "Tar ni kontanter?",
          answer:
            "Vi är en kontantfri restaurang och tar endast kortbetalning. Detta gör servicen snabbare och smidigare för alla.",
        },
        {
          question: "Har ni veganska och glutenfria alternativ?",
          answer:
            "Japp! Du kan bland annat välja glutenfri pizzabotten (+45 kr) eller vegansk bearnaise (+25 kr). Vi fixar det mesta. Fråga bara personalen så löser vi något gott åt dig.",
        },
        {
          question: "Har ni plats för större sällskap?",
          answer:
            "Jadå! Vi har plats upp till 50 personer för allt från födelsedagskalas och tentafiranden till examenspartyn och företagsfester. Ring gärna eller använd kontaktformuläret nedan så fixar vi ett bra upplägg.",
        },
      ]
    : [
        {
          question: "How much is the lunch at Palermo?",
          answer:
            lunchInfo ||
            "Our weekday lunch special is from 119 SEK, served 11:00-15:00. It includes a main course, plus salad bar, bread and coffee. Pick from 9 daily classics or any of our 24 lunch pizzas.",
        },
        {
          question: "What are Palermo Uppsala's opening hours?",
          answer:
            openingHours ||
            "Monday: 11:00 AM - 1:00 AM\nTuesday-Friday: 11:00 AM - 3:00 AM\nSaturday: 12:00 PM - 3:00 AM\nSunday: 12:00 PM - 1:00 AM\n\nLunch served weekdays 11:00 AM - 3:00 PM.",
        },
        {
          question: "Can I order delivery?",
          answer:
            "Absolutely! We're on Uber Eats, Foodora and Wolt. Perfect when you want to enjoy Palermo's food from your couch. We deliver throughout Uppsala.",
        },
        {
          question: "Do you accept cash?",
          answer:
            "We are a cashless restaurant and only accept card payments. This makes service faster and smoother for everyone.",
        },
        {
          question: "Do you have vegan and gluten-free options?",
          answer:
            "Yes! You can choose gluten-free pizza crust (+45 SEK) or vegan béarnaise (+25 SEK), among other options. We can accommodate most dietary needs. Just ask our staff and we'll fix something delicious for you.",
        },
        {
          question: "Do you have space for larger groups?",
          answer:
            "Yes! We can accommodate up to 50 people for everything from birthday parties and post-exam celebrations to graduation dinners and corporate events. Just call or use our contact form below and we'll set something up.",
        },
      ];
}

// FAQ Schema for better SEO visibility
export function generateFAQSchema(
  locale: "sv" | "en",
  openingHours?: string,
  lunchInfo?: string,
  sanityFAQData?: FAQ,
) {
  let faqs: { question: string; answer: string }[];

  if (sanityFAQData?.questions) {
    // Use Sanity FAQ data if available
    faqs = sanityFAQData.questions.map((item) => {
      let processedAnswer = item.answer[locale];

      // Replace all occurrences of dynamic content placeholders
      if (openingHours) {
        processedAnswer = processedAnswer.replace(
          /{{openingHours}}/g,
          openingHours,
        );
      }
      if (lunchInfo) {
        processedAnswer = processedAnswer.replace(/{{lunchInfo}}/g, lunchInfo);
      }

      return {
        question: item.question[locale],
        answer: processedAnswer,
      };
    });
  } else {
    // Fallback to hardcoded data
    faqs = getFAQData(locale, openingHours, lunchInfo);
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
