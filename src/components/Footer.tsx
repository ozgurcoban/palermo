"use client";

import Image from "next/image";
import { FacebookIcon, InstagramIcon } from "lucide-react";
import Link from "next/link";
import { trackSocialClick } from "@/lib/gtag";

import {
  HomeIcon,
  ChatBubbleIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import { useGetLocale } from "@/config";
import Localization from "./localization";

export default function Footer({ contactData }: { contactData?: Contact }) {
  const locale = useGetLocale();

  if (!contactData)
    return (
      <div className="flex w-full items-center justify-center">
        {" "}
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

  return (
    <footer className="border-t border-border bg-[#8B7355] text-white dark:bg-muted/50 dark:text-card-foreground">
      <div className="container grid grid-cols-1 gap-y-10 py-16 md:grid-cols-3">
        {/* Opening hours */}
        {opening_hours && (
          <div className="justify-self-center">
            <div className="flex flex-col items-start">
              <h3 className="text-lg uppercase text-[#e2e8c0] dark:text-primary">
                <Localization text="ContactSection.openingHours" />
              </h3>

              <ul className="">
                {opening_hours.map(({ day, time }, i) => (
                  <li
                    key={i}
                    className="mx-auto flex max-w-[17rem] items-center justify-between gap-8 pt-3 sm:mx-0"
                  >
                    <span className="whitespace-nowrap font-medium">
                      {day[locale]}
                    </span>
                    <span className="">{time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="order-0 flex flex-col items-center gap-4">
          <Link href={"/"}>
            <Image
              src="/logo.png"
              alt="logo"
              width={130}
              height={130}
              className="block rounded-full dark:hidden"
            />
            <Image
              src="/dark-logo.png"
              alt="logo"
              width={130}
              height={130}
              className="hidden rounded-full dark:block"
              style={{ border: "2px solid #848E97", transform: "scale(1.04)" }}
            />
          </Link>
          <p className="text-white dark:text-card-foreground">
            <Localization text="Footer.slogan" />
          </p>
          {contact_infos && (
            <div className="flex gap-4">
              {contact_infos.facebook && (
                <Link
                  href={contact_infos.facebook}
                  target="_blank"
                  aria-label="Facebook"
                  className="transition-all duration-300 hover:text-accent"
                  onClick={() => trackSocialClick('facebook')}
                >
                  <FacebookIcon />
                </Link>
              )}
              {contact_infos.instagram && (
                <Link
                  href={contact_infos.instagram}
                  target="_blank"
                  aria-label="Instagram"
                  className="transition-all duration-300 hover:text-primary"
                  onClick={() => trackSocialClick('instagram')}
                >
                  <InstagramIcon />
                </Link>
              )}
            </div>
          )}
        </div>
        {/* Contact */}
        {contact_infos && (
          <div className="justify-self-center">
            <div className="flex flex-col items-start">
              <h3 className="flex text-lg uppercase text-[#e2e8c0] dark:text-primary">
                <Localization text="ContactSection.addressTitle" />
              </h3>
              <ul>
                {contact_infos.address && (
                  <li className="flex items-center gap-2 pt-3 transition-all duration-300 hover:text-primary">
                    <HomeIcon className="size-5" />
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
                  <li className="flex items-center gap-2 pt-3 transition-all duration-300 hover:text-primary">
                    <ChatBubbleIcon className="size-5" />
                    <a href={`tel:${contact_infos.telephone}`}>
                      <Localization text="ContactSection.phone" />
                      :&nbsp;
                      {contact_infos.telephone}
                    </a>
                  </li>
                )}
                {contact_infos.email && (
                  <li className="flex items-center gap-2 pt-3 transition-all duration-300 hover:text-primary">
                    <EnvelopeClosedIcon className="size-5" />
                    <a href={`mailto:${contact_infos.email}`}>
                      <Localization text="ContactSection.email" />
                      :&nbsp;
                      {contact_infos.email}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
