"use client";

import Image from "next/image";
import {
  InstagramIcon,
  PhoneIcon,
  MapPinIcon,
  MailIcon,
  ClockIcon,
} from "lucide-react";
import { Link } from "@/navigation";
import { trackSocialClick, trackPhoneClick } from "@/lib/gtag";
import { useGetLocale } from "@/config";
import Localization from "./localization";
import { useTranslations } from "next-intl";
import React from "react";

export default function Footer({ contactData }: { contactData?: Contact }) {
  const locale = useGetLocale();
  const t = useTranslations();

  if (!contactData)
    return (
      <div className="flex w-full items-center justify-center">
        <Link href={"/"}>
          <Image
            src="/logo.png"
            alt="logo"
            width={70}
            height={70}
            className="block rounded-full dark:hidden"
          />
          <Image
            src="/dark-logo.png"
            alt="logo"
            width={70}
            height={70}
            className="hidden rounded-full dark:block"
          />
        </Link>
      </div>
    );

  const { contact_infos, opening_hours } = contactData;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-[#6B5D54] text-white dark:bg-background/95 dark:text-foreground">
      <div
        className="container pb-40 pt-16 md:py-16 lg:pb-16"
        style={{
          paddingBottom:
            typeof window !== "undefined" && window.innerWidth < 768
              ? "128px"
              : undefined,
        }}
      >
        {/* Call to Action Button - Mobile and Desktop */}
        {contact_infos?.telephone && (
          <div className="mb-10 flex justify-center">
            <a
              href={`tel:+4618131820`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-lg font-medium text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:bg-primary/90"
              onClick={() => trackPhoneClick()}
            >
              <PhoneIcon className="h-5 w-5" />
              <Localization text="Footer.orderByPhone" />: 018-13 18 20
            </a>
          </div>
        )}

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="mx-auto grid max-w-5xl grid-cols-3 gap-x-16">
            {/* Left Column: Opening Hours */}
            {opening_hours && (
              <div className="text-left">
                <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold uppercase text-[#F5E6D3] dark:text-primary">
                  <ClockIcon className="h-5 w-5" />
                  <Localization text="ContactSection.openingHours" />
                </h3>
                <ul className="inline-block space-y-3">
                  {opening_hours.map(({ day, time }, i) => (
                    <li key={i} className="flex items-center gap-6 text-sm">
                      <span className="w-24 font-medium">{day[locale]}</span>
                      <span className="text-white/80 dark:text-foreground/80">
                        {time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Center Column: Logo, Social & Quick Links */}
            <div className="flex flex-col items-center text-center">
              <Link
                href={"/"}
                className="mb-4 transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={120}
                  height={120}
                  className="block rounded-full dark:hidden"
                />
                <Image
                  src="/dark-logo.png"
                  alt="logo"
                  width={120}
                  height={120}
                  className="hidden rounded-full dark:block"
                  style={{ border: "2px solid #848E97" }}
                />
              </Link>
              <p className="mb-4 text-sm italic">
                <Localization text="Footer.slogan" />
              </p>

              {/* Quick Links - Centered under logo */}
              <div className="mb-4">
                <h3 className="mb-3 text-sm font-semibold uppercase text-[#F5E6D3] dark:text-primary">
                  <Localization text="Footer.quickLinks" />
                </h3>
                <ul className="flex space-x-6 text-sm">
                  <li>
                    <Link
                      href="/"
                      className="transition-colors duration-300 hover:text-[#F5E6D3] dark:hover:text-primary"
                    >
                      <Localization text="Navigation.home" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/menu"
                      className="transition-colors duration-300 hover:text-[#F5E6D3] dark:hover:text-primary"
                    >
                      <Localization text="Navigation.menu" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/lunch"
                      className="transition-colors duration-300 hover:text-[#F5E6D3] dark:hover:text-primary"
                    >
                      <Localization text="Navigation.lunch" />
                    </Link>
                  </li>
                </ul>
              </div>

              {contact_infos?.instagram && (
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs text-white/80 dark:text-foreground/80">
                    <Localization text="Footer.followUs" />
                  </p>
                  <a
                    href={contact_infos.instagram}
                    target="_blank"
                    aria-label="Instagram"
                    className="transition-all duration-300 hover:scale-110 hover:text-[#F5E6D3] dark:hover:text-primary"
                    onClick={() => trackSocialClick("instagram", "footer")}
                  >
                    <InstagramIcon size={24} />
                  </a>
                </div>
              )}
            </div>

            {/* Right Column: Contact */}
            {contact_infos && (
              <div className="text-left">
                <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold uppercase text-[#F5E6D3] dark:text-primary">
                  <MapPinIcon className="h-5 w-5" />
                  <Localization text="ContactSection.addressTitle" />
                </h3>
                <ul className="space-y-4">
                  {contact_infos.address && (
                    <li className="flex items-start gap-3 text-sm transition-all duration-300 hover:text-[#F5E6D3] dark:hover:text-primary">
                      <MapPinIcon className="mt-0.5 h-4 w-4 flex-shrink-0" />
                      <a
                        href="https://www.google.com/maps/dir/?api=1&destination=Sysslomansgatan+7,+753+11+Uppsala,+Sverige"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {contact_infos.address}
                      </a>
                    </li>
                  )}
                  {contact_infos.telephone && (
                    <li className="flex items-center gap-3 text-sm transition-all duration-300 hover:text-[#F5E6D3] dark:hover:text-primary">
                      <PhoneIcon className="h-4 w-4 flex-shrink-0" />
                      <a href={`tel:+4618131820`}>018-13 18 20</a>
                    </li>
                  )}
                  {contact_infos.email && (
                    <li className="flex items-center gap-3 text-sm transition-all duration-300 hover:text-[#F5E6D3] dark:hover:text-primary">
                      <MailIcon className="h-4 w-4 flex-shrink-0" />
                      <a href={`mailto:${contact_infos.email}`}>
                        {contact_infos.email}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 lg:hidden">
          {/* Opening hours */}
          {opening_hours && (
            <div className="text-center md:text-left">
              <h3 className="mb-4 flex items-center justify-center gap-2 text-lg font-semibold uppercase text-[#F5E6D3] dark:text-primary md:justify-start">
                <ClockIcon className="h-5 w-5" />
                <Localization text="ContactSection.openingHours" />
              </h3>
              <ul className="inline-block space-y-3 text-left">
                {opening_hours.map(({ day, time }, i) => (
                  <li key={i} className="flex items-center gap-8 text-sm">
                    <span className="w-16 font-medium">{day[locale]}</span>
                    <span className="text-white/80 dark:text-foreground/80">
                      {time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Logo and Social */}
          <div className="flex flex-col items-center gap-4 text-center">
            <Link
              href={"/"}
              className="transition-transform duration-300 hover:scale-105"
            >
              <Image
                src="/logo.png"
                alt="logo"
                width={100}
                height={100}
                className="block rounded-full dark:hidden"
              />
              <Image
                src="/dark-logo.png"
                alt="logo"
                width={100}
                height={100}
                className="hidden rounded-full dark:block"
                style={{ border: "2px solid #848E97" }}
              />
            </Link>
            <p className="text-sm italic">
              <Localization text="Footer.slogan" />
            </p>
            {contact_infos?.instagram && (
              <div className="mt-2 flex flex-col items-center gap-2">
                <p className="text-xs text-white/80 dark:text-foreground/80">
                  <Localization text="Footer.followUs" />
                </p>
                <a
                  href={contact_infos.instagram}
                  target="_blank"
                  aria-label="Instagram"
                  className="transition-all duration-300 hover:scale-110 hover:text-[#F5E6D3] dark:hover:text-primary"
                  onClick={() => trackSocialClick("instagram", "footer")}
                >
                  <InstagramIcon size={24} />
                </a>
              </div>
            )}
          </div>

          {/* Contact */}
          {contact_infos && (
            <div className="text-center md:text-left">
              <h3 className="mb-4 flex items-center justify-center gap-2 text-lg font-semibold uppercase text-[#F5E6D3] dark:text-primary md:justify-start">
                <MapPinIcon className="h-5 w-5" />
                <Localization text="ContactSection.addressTitle" />
              </h3>
              <ul className="space-y-3">
                {contact_infos.address && (
                  <li className="flex items-center justify-center gap-2 text-sm transition-all duration-300 hover:text-[#F5E6D3] dark:hover:text-primary md:justify-start">
                    <MapPinIcon className="h-4 w-4 flex-shrink-0" />
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=Sysslomansgatan+7,+753+11+Uppsala,+Sverige"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contact_infos.address}
                    </a>
                  </li>
                )}
                {contact_infos.telephone && (
                  <li className="flex items-center justify-center gap-2 text-sm transition-all duration-300 hover:text-[#F5E6D3] dark:hover:text-primary md:justify-start">
                    <PhoneIcon className="h-4 w-4 flex-shrink-0" />
                    <a href={`tel:+4618131820`}>018-13 18 20</a>
                  </li>
                )}
                {contact_infos.email && (
                  <li className="flex items-center justify-center gap-2 text-sm transition-all duration-300 hover:text-[#F5E6D3] dark:hover:text-primary md:justify-start">
                    <MailIcon className="h-4 w-4 flex-shrink-0" />
                    <a href={`mailto:${contact_infos.email}`}>
                      {contact_infos.email}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-white/20 pt-6 text-center">
          <p className="text-sm text-white/70 dark:text-foreground/70">
            {t("Footer.copyright", { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
