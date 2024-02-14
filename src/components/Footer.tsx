import Image from "next/image";
import { FacebookIcon, InstagramIcon } from "lucide-react";
import Link from "next/link";

import {
  HomeIcon,
  ChatBubbleIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import { useGetLocale } from "@/config";

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
      <div className="container py-16 gap-y-10 grid sm:grid-cols-3 grid-cols-1">
        {/* Opmeing hours */}
        {opening_hours && (
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg uppercase text-[#e2e8c0]">opening hours</h3>
            <ul className="w-full sm:w-fit">
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
        )}

        <div className="sm:max-w-xs flex flex-col items-center gap-4 sm:row-auto row-start-1">
          <Link href={"/"}>
            <Image src="/logo.png" alt="logo" width={70} height={70} />
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
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="flex text-lg uppercase text-[#e2e8c0]">
              where to find us
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
                    Telephone: {contact_infos.telephone}
                  </a>
                </li>
              )}
              {contact_infos.email && (
                <li className="flex items-center gap-2 pt-3 hover:text-primary transition-all duration-300">
                  <EnvelopeClosedIcon className="size-5" />
                  <a href={`mailto:${contact_infos.email}`}>
                    Email: {contact_infos.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </footer>
  );
}
