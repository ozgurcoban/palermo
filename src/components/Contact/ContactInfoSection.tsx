import {
  HomeIcon,
  ChatBubbleIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import ContactForm from "./Form";
import Link from "next/link";

const openingHours = [
  { day: "Monday:", open: "11:00 AM", close: "01:00 AM" },
  { day: "Tuesday - Friday:", open: "11:00 AM", close: "03:00 AM" },
  { day: "Saturday:", open: "12:00 PM", close: "03:00 AM" },
  { day: "Sunday:", open: "12:00 PM", close: "01:00 AM" },
];

export default function ContactInfoSection() {
  return (
    <section className="w-screen py-16 pt-28 border-image" id="contact">
      <div className="container grid lg:grid-cols-2 items-center gap-5">
        <div className="flex justify-between md:flex-row lg:flex-col flex-col gap-10 mb-10">
          <div className="flex-1">
            <h2 className="title-secondary whitespace-nowrap">Where to find us</h2>
            <ul className="flex flex-col mx-auto w-fit lg:w-full">
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
            <h2 className="title-secondary">Opening hours</h2>
            <ul className="flex flex-col mx-auto w-fit md:w-full">
              {openingHours.map((day, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between gap-8 pt-3 max-w-md"
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
    </section>
  );
}
