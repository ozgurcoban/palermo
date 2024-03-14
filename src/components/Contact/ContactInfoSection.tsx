import {
  HomeIcon,
  ChatBubbleIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import ContactForm from "./Form";
import Link from "next/link";
import Map from "./Map";
import { useGetLocale } from "@/config";
import Localization from "../localization";

export default function ContactInfoSection({
  contactData,
}: {
  contactData?: Contact;
}) {
  const locale = useGetLocale();
  if (!contactData)
    return (
      <section className="w-screen pt-28 border-image" id="contact">
        <div className="container py-16">
          <ContactForm />
        </div>
      </section>
    );

  const { contact_infos, opening_hours } = contactData;

  return (
    <section className="w-screen pt-28 border-image" id="contact">
      <div className="w-full">
        <div className="container py-16">
          <div className="grid lg:grid-cols-2 items-center gap-5">
            <div className="flex justify-between md:flex-row lg:flex-col flex-col gap-10 mb-10">
              {contact_infos && (
                <div className="flex-1">
                  <h2 className="title-secondary flex">
                    <Localization text="ContactSection.addressTitle" />
                  </h2>
                  <ul>
                    {contact_infos.address && (
                      <li className="flex items-center gap-2 pt-3 hover:text-accent transition-all duration-300">
                        <HomeIcon className="size-5" />
                        <Link href="#">{contact_infos.address}</Link>
                      </li>
                    )}
                    {contact_infos.telephone && (
                      <li className="flex items-center gap-2 pt-3 hover:text-accent transition-all duration-300">
                        <ChatBubbleIcon className="size-5" />
                        <Link href={`tel:${contact_infos.telephone}`}>
                          <Localization text="ContactSection.phone" />
                          :&nbsp;
                          {contact_infos.telephone}
                        </Link>
                      </li>
                    )}
                    {contact_infos.email && (
                      <li className="flex items-center gap-2 pt-3 hover:text-accent transition-all duration-300">
                        <EnvelopeClosedIcon className="size-5" />
                        <Link href={`mailto:${contact_infos.email}`}>
                          <Localization text="ContactSection.email" />
                          :&nbsp;
                          {contact_infos.email}
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              )}
              {opening_hours && (
                <div className="flex-1">
                  <h2 className="title-secondary flex">
                    <Localization text="ContactSection.openingHours" />
                  </h2>
                  <ul>
                    {opening_hours.map(({ day, time }) => (
                      <li
                        key={day[locale]}
                        className="flex items-center justify-between gap-8 pt-3 max-w-sm"
                      >
                        <span className="font-medium">{day[locale]}</span>
                        <span className="">{time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
      <Map />
    </section>
  );
}
