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
    <footer className="bg-[#2E3D44] text-light">
      <div className="container py-16 sm:flex grid grid-cols-3">
        <div className="flex-1 w-full">
          <div className="max-w-xs flex flex-col gap-4">
            <Image src="/logo.png" alt="logo" width={70} height={70} />
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto
              quibusdam vel molestiae.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://www.facebook.com/profile.php?id=100046443356150"
                target="_blank"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </Link>
              <Link
                href="https://www.instagram.com/palermo_uppsala"
                target="_blank"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </Link>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 flex-1">
          {/* Opmeing hours */}
          <div className="flex-1">
            <h3 className="text-lg uppercase">opening hours</h3>
            <ul>
              {openingHours.map((day, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between gap-8 pt-3 max-w-[17rem]"
                >
                  <span className="font-medium whitespace-nowrap">
                    {day.day}
                  </span>
                  <span className="">
                    {day.open} - {day.close}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex-1">
            <h3 className="flex text-lg uppercase">where to find us</h3>
            <ul>
              <li className="flex items-center gap-2 pt-3 hover:text-accent transition-all duration-300">
                <HomeIcon className="size-5" />
                <a href="#">Sysslomansgatan 7, 754 13, Uppsala</a>
              </li>
              <li className="flex items-center gap-2 pt-3 hover:text-accent transition-all duration-300">
                <ChatBubbleIcon className="size-5" />
                <a href="tel:4618255770">Telephone: +4618255770</a>
              </li>
              <li className="flex items-center gap-2 pt-3 hover:text-accent transition-all duration-300">
                <EnvelopeClosedIcon className="size-5" />
                <a href="mailto:info@palermo-uppsala.se">
                  Email: info@palermo-uppsala.se
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
