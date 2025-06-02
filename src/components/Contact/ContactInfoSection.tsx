import {
  HomeIcon,
  ChatBubbleIcon,
  EnvelopeClosedIcon,
  ArrowRightIcon,
} from "@radix-ui/react-icons";
import ContactForm from "./Form";
import Link from "next/link";
import { Link as IntlLink } from "@/navigation";
import Map from "./Map";
import { useGetLocale } from "@/config";
import Localization from "../localization";
import FadeUp from "../ui/FadeUp";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ContactInfoSection({
  contactData,
  lunchData,
}: {
  contactData?: Contact;
  lunchData?: LunchConfiguration;
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
    <section className="border-image w-screen" id="contact">
      <div className="w-full">
        <div className="container py-16">
          {/* Intro section */}
          <div className="mb-12 text-center">
            <FadeUp delay={0.2}>
              <h2 className="title-secondary mb-4">
                <Localization text="ContactSection.introTitle" />
              </h2>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="text-body mx-auto max-w-2xl">
                <Localization text="ContactSection.introDescription" />
              </p>
            </FadeUp>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              {contact_infos && (
                <FadeUp delay={0.4}>
                  <Card className="border-0 bg-white/80 shadow-lg">
                    <CardHeader>
                      <CardTitle className="title-card">
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
                          <Link href={`tel:+4618131820`} className="text-base">
                            <Localization text="ContactSection.phone" />
                            :&nbsp; 018-13 18 20
                          </Link>
                        </div>
                      )}
                      {contact_infos.email && (
                        <div className="flex items-center gap-3 transition-all duration-300 hover:text-accent">
                          <EnvelopeClosedIcon className="size-5 text-accent" />
                          <Link
                            href={`mailto:${contact_infos.email}`}
                            className="text-base"
                          >
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
                      <CardTitle className="title-card">
                        <Localization text="ContactSection.openingHours" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {opening_hours.map(({ day, time }, index) => (
                          <div key={day[locale]}>
                            <div className="flex items-center justify-between">
                              <span className="text-base font-medium">
                                {day[locale]}
                              </span>
                              <span className="text-base text-muted-foreground">
                                {time}
                              </span>
                            </div>
                            {index < opening_hours.length - 1 && (
                              <Separator className="mt-3 bg-gray-200" />
                            )}
                          </div>
                        ))}
                        {lunchData?.timeInfo && (
                          <>
                            <Separator className="mt-3 bg-gray-200" />
                            <IntlLink
                              href="/lunch"
                              className="group -mx-2 block rounded-md px-2 pb-2 pt-2 transition-all duration-300 hover:bg-accent/5"
                            >
                              <div className="mb-2 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="text-base font-semibold text-primary transition-colors group-hover:text-accent">
                                    Lunch
                                  </span>
                                  <ArrowRightIcon className="size-4 translate-x-0 transform text-accent transition-transform duration-300 group-hover:translate-x-1" />
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-base font-medium transition-colors group-hover:text-accent">
                                  {lunchData.timeInfo.days[locale].charAt(0).toUpperCase() + lunchData.timeInfo.days[locale].slice(1)}
                                </span>
                                <span className="text-base text-muted-foreground transition-colors group-hover:text-accent">
                                  {lunchData.timeInfo.hours}
                                </span>
                              </div>
                              {lunchData.dagensLunch?.price && (
                                <div className="mt-2">
                                  <span className="text-sm text-muted-foreground transition-colors group-hover:text-accent/80">
                                    {lunchData.dagensLunch.price}{" "}
                                    {locale === "sv"
                                      ? "kr inkl. sallad, bröd & kaffe"
                                      : "SEK incl. salad bar, bread & coffee"}
                                  </span>
                                </div>
                              )}
                            </IntlLink>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </FadeUp>
              )}
            </div>
            <FadeUp delay={0.8}>
              <Card className="h-fit border-0 bg-white/80 shadow-lg">
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
