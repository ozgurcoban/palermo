import Image from "next/image";
import { FacebookIcon, InstagramIcon } from "lucide-react";
import Link from "next/link";

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
      <div className="w-full flex items-center justify-center">
        {" "}
        <Link href={"/"}>
          <Image src="/logo.png" alt="logo" width={70} height={70} />
        </Link>
      </div>
    );

  const { contact_infos, opening_hours } = contactData;

  return (
    <footer className="bg-[#292d36] text-light">
      <div className="container py-16 gap-y-10 grid md:grid-cols-3 grid-cols-1">
        {/* Opening hours */}
        {opening_hours && (
          <div className="justify-self-center">
            <div className="flex flex-col items-start">
              <h3 className="text-lg uppercase text-[#e2e8c0]">
                <Localization text="ContactSection.openingHours" />
              </h3>

              <ul className="">
                {opening_hours.map(({ day, time }, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between gap-8 pt-3 mx-auto sm:mx-0 max-w-[17rem]"
                  >
                    <span className="font-medium whitespace-nowrap">
                      {day[locale]}
                    </span>
                    <span className="">{time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="flex flex-col items-center gap-4 order-0">
          <Link href={"/"}>
            <Image src="/logo.png" alt="logo" width={130} height={130} />
          </Link>
          {contact_infos && (
            <div className="flex gap-4">
              {contact_infos.facebook && (
                <Link
                  href={contact_infos.facebook}
                  target="_blank"
                  aria-label="Facebook"
                  className="hover:text-primary transition-all duration-300"
                >
                  <FacebookIcon />
                </Link>
              )}
              {contact_infos.instagram && (
                <Link
                  href={contact_infos.instagram}
                  target="_blank"
                  aria-label="Instagram"
                  className="hover:text-primary transition-all duration-300"
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
              <h3 className="flex text-lg uppercase text-[#e2e8c0]">
                <Localization text="ContactSection.addressTitle" />
              </h3>
              <ul>
                {contact_infos.address && (
                  <li className="flex items-center gap-2 pt-3 hover:text-primary transition-all duration-300">
                    <HomeIcon className="size-5" />
                    <a href="#">{contact_infos.address}</a>
                  </li>
                )}
                {contact_infos.telephone && (
                  <li className="flex items-center gap-2 pt-3 hover:text-primary transition-all duration-300">
                    <ChatBubbleIcon className="size-5" />
                    <a href={`tel:${contact_infos.telephone}`}>
                      <Localization text="ContactSection.phone" />:
                      {contact_infos.telephone}
                    </a>
                  </li>
                )}
                {contact_infos.email && (
                  <li className="flex items-center gap-2 pt-3 hover:text-primary transition-all duration-300">
                    <EnvelopeClosedIcon className="size-5" />
                    <a href={`mailto:${contact_infos.email}`}>
                      <Localization text="ContactSection.email" />:
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
