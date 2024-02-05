import Image from "next/image";
import { FacebookIcon, InstagramIcon } from "lucide-react";
import { openingHours } from "./Contact/ContactInfoSection";
import Link from "next/link";

import {
  HomeIcon,
  ChatBubbleIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";

export default function Footer() {
  return (
    <footer className="bg-[#292d36] text-light">
      <div className="container py-16 gap-y-10 grid sm:grid-cols-3 grid-cols-1">
        {/* Opmeing hours */}
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-lg uppercase text-[#e2e8c0]">opening hours</h3>
          <ul className="w-full sm:w-fit">
            {openingHours.map((day, i) => (
              <li
                key={i}
                className="flex items-center justify-between gap-8 pt-3 mx-auto sm:mx-0 max-w-[17rem]"
              >
                <span className="font-medium whitespace-nowrap">{day.day}</span>
                <span className="">
                  {day.open} - {day.close}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="sm:max-w-xs flex flex-col items-center gap-4 sm:row-auto row-start-1">
          <Link href={"/"}>
            <Image src="/logo.png" alt="logo" width={70} height={70} />
          </Link>
          <div className="flex gap-4">
            <Link
              href="https://www.facebook.com/profile.php?id=100046443356150"
              target="_blank"
              aria-label="Facebook"
              className="hover:text-primary transition-all duration-300"
            >
              <FacebookIcon />
            </Link>
            <Link
              href="https://www.instagram.com/palermo_uppsala"
              target="_blank"
              aria-label="Instagram"
              className="hover:text-primary transition-all duration-300"
            >
              <InstagramIcon />
            </Link>
          </div>
        </div>
        {/* Contact */}
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="flex text-lg uppercase text-[#e2e8c0]">
            where to find us
          </h3>
          <ul>
            <li className="flex items-center gap-2 pt-3 hover:text-primary transition-all duration-300">
              <HomeIcon className="size-5" />
              <a href="#">Sysslomansgatan 7, 754 13, Uppsala</a>
            </li>
            <li className="flex items-center gap-2 pt-3 hover:text-primary transition-all duration-300">
              <ChatBubbleIcon className="size-5" />
              <a href="tel:4618255770">Telephone: +4618255770</a>
            </li>
            <li className="flex items-center gap-2 pt-3 hover:text-primary transition-all duration-300">
              <EnvelopeClosedIcon className="size-5" />
              <a href="mailto:info@palermo-uppsala.se">
                Email: info@palermo-uppsala.se
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
