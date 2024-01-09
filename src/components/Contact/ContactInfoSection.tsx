import {
  HomeIcon,
  ChatBubbleIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import Form from "./Form";

const openingHours = [
  { day: "Monday:", open: "11:00 AM", close: "01:00 AM" },
  { day: "Tuesday:", open: "11:00 AM", close: "03:00 AM" },
  { day: "Wednesday:", open: "11:00 AM", close: "03:00 AM" },
  { day: "Thursday:", open: "11:00 AM", close: "03:00 AM" },
  { day: "Friday:", open: "11:00 AM", close: "03:00 AM" },
  { day: "Saturday:", open: "12:00 PM", close: "03:00 AM" },
  { day: "Sunday:", open: "12:00 PM", close: "01:00 AM" },
];

export default function ContactInfoSection() {
  return (
    <section className="w-screen py-16 bg-[#F8EEE2]">
      <div className="container grid lg:grid-cols-2 items-center gap-5">
        <div className="flex justify-between md:flex-row lg:flex-col flex-col gap-10">
          <div>
            <h2 className="title-secondary">where to find us</h2>
            <ul>
              <li className="flex items-center gap-2 pt-3">
                <HomeIcon className="size-5" />
                <a href="#">Sysslomansgatan 7, 754 13, Uppsala</a>
              </li>
              <li className="flex items-center gap-2 pt-3">
                <ChatBubbleIcon className="size-5" />
                <a href="#">Telephone: +4618255770</a>
              </li>
              <li className="flex items-center gap-2 pt-3">
                <EnvelopeClosedIcon className="size-5" />
                <a href="#">Email: info@palermo-uppsala.se</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="title-secondary">opening hours</h2>
            <ul>
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
        <Form />
      </div>
    </section>
  );
}
