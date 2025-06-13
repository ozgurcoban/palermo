"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const ContactInfoSection = dynamic(
  () => import("./ContactInfoSection"),
  {
    ssr: false,
    loading: () => (
      <section className="border-image w-screen" id="contact">
        <div className="container py-16">
          <div className="h-[600px] animate-pulse bg-muted/10 rounded-lg" />
        </div>
      </section>
    ),
  }
);

interface ContactInfoSectionLazyProps {
  contactData?: Contact;
  lunchData?: LunchConfiguration;
}

export default function ContactInfoSectionLazy({
  contactData,
  lunchData,
}: ContactInfoSectionLazyProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        // Load when section is 100px away from viewport
        rootMargin: "100px",
        threshold: 0,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={sectionRef}>
      {shouldLoad ? (
        <ContactInfoSection contactData={contactData} lunchData={lunchData} />
      ) : (
        <section className="border-image w-screen" id="contact">
          <div className="container py-16">
            <div className="h-[600px]" />
          </div>
        </section>
      )}
    </div>
  );
}