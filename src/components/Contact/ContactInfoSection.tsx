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
import FadeUp from "../ui/FadeUp";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ContactInfoSection({
  contactData,
}: {
  contactData?: Contact;
}) {
  const locale = useGetLocale();
  if (!contactData)
    return (
      <section className="border-image w-screen pt-28" id="contact">
        <div className="container py-16">
          <ContactForm />
        </div>
      </section>
    );

  const { contact_infos, opening_hours } = contactData;

  return (
    <section className="border-image w-screen pt-28" id="contact">
      <div className="w-full">
        <div className="container py-16">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              {contact_infos && (
                <FadeUp delay={0.4}>
                  <Card className="border-0 bg-white/80 shadow-lg">
                    <CardHeader>
                      <CardTitle className="title-secondary">
                        <Localization text="ContactSection.addressTitle" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {contact_infos.address && (
                        <div className="flex items-center gap-3 transition-all duration-300 hover:text-accent">
                          <HomeIcon className="size-5 text-accent" />
                          <Link href="#" className="text-base">
                            {contact_infos.address}
                          </Link>
                        </div>
                      )}
                      {contact_infos.telephone && (
                        <div className="flex items-center gap-3 transition-all duration-300 hover:text-accent">
                          <ChatBubbleIcon className="size-5 text-accent" />
                          <Link href={`tel:${contact_infos.telephone}`} className="text-base">
                            <Localization text="ContactSection.phone" />
                            :&nbsp;
                            {contact_infos.telephone}
                          </Link>
                        </div>
                      )}
                      {contact_infos.email && (
                        <div className="flex items-center gap-3 transition-all duration-300 hover:text-accent">
                          <EnvelopeClosedIcon className="size-5 text-accent" />
                          <Link href={`mailto:${contact_infos.email}`} className="text-base">
                            <Localization text="ContactSection.email" />
                            :&nbsp;
                            {contact_infos.email}
                          </Link>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </FadeUp>
              )}
              {opening_hours && (
                <FadeUp delay={0.6}>
                  <Card className="border-0 bg-white/80 shadow-lg">
                    <CardHeader>
                      <CardTitle className="title-secondary">
                        <Localization text="ContactSection.openingHours" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {opening_hours.map(({ day, time }, index) => (
                          <div key={day[locale]}>
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-base">{day[locale]}</span>
                              <span className="text-base text-muted-foreground">{time}</span>
                            </div>
                            {index < opening_hours.length - 1 && (
                              <Separator className="mt-3 bg-gray-200" />
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </FadeUp>
              )}
            </div>
            <FadeUp delay={0.8}>
              <Card className="border-0 bg-white/80 shadow-lg h-fit">
                <CardContent className="p-6">
                  <ContactForm />
                </CardContent>
              </Card>
            </FadeUp>
          </div>
        </div>
      </div>
      <Map />
    </section>
  );
}
