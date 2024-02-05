import {
  HomeIcon,
  ChatBubbleIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import ContactForm from "./Form";
import Link from "next/link";
import Map from "./Map";

export const openingHours = [
  { day: "Mon:", open: "11:00", close: "01:00" },
  { day: "Tue - Fri:", open: "11:00", close: "03:00" },
  { day: "Sat:", open: "12:00", close: "03:00" },
  { day: "Sun:", open: "12:00", close: "01:00" },
];

export default function ContactInfoSection() {
  return (
    <section className="w-screen pt-28 border-image" id="contact">
      <div className="w-full">
        <div className="container py-16">
          <div className="grid lg:grid-cols-2 items-center gap-5">
            <div className="flex justify-between md:flex-row lg:flex-col flex-col gap-10 mb-10">
              <div className="flex-1">
                <h2 className="title-secondary flex">Where to find us</h2>
                <ul>
                  <li className="flex items-center gap-2 pt-3 hover:text-accent transition-all duration-300">
                    <HomeIcon className="size-5" />
                    <Link href="#">Sysslomansgatan 7, 754 13, Uppsala</Link>
                  </li>
                  <li className="flex items-center gap-2 pt-3 hover:text-accent transition-all duration-300">
                    <ChatBubbleIcon className="size-5" />
                    <Link href="tel:4618255770">Telephone: +4618255770</Link>
                  </li>
                  <li className="flex items-center gap-2 pt-3 hover:text-accent transition-all duration-300">
                    <EnvelopeClosedIcon className="size-5" />
                    <Link href="mailto:info@palermo-uppsala.se">
                      Email: info@palermo-uppsala.se
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex-1">
                <h2 className="title-secondary flex">Opening hours</h2>
                <ul>
                  {openingHours.map((day, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between gap-8 pt-3 max-w-sm"
                    >
                      <span className="font-medium">{day.day}</span>
                      <span className="">
                        {day.open} - {day.close}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
      <Map />
    </section>
  );
}
