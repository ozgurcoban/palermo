import { useGetLocale } from "@/config";
import Image from "next/image";
import urlFor from "@/lib/urlFor";
import { Sofa, Pizza, Beer, CreditCard } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import React from "react";
import Localization from "./localization";
import { string } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const iconMapping: { [key: string]: React.ElementType } = {
  Sofa,
  Pizza,
  Beer,
  CreditCard,
};

const AboutUs = ({ data }: { data?: AboutUsSection }) => {
  const locale = useGetLocale();
  const t = useTranslations("Home.About");

  // const quickFacts: {
  //   title: string;
  //   description: string;
  //   icon: string;
  // }[] = t("quickFacts.facts", { returnObjects: true });

  if (!data) return null;

  const { title, description, image, quickFacts } = data;
  // console.log("titlelainen:", title[locale]);
  // console.log("description:", description[locale]);
  console.log(
    "quickfacts:",
    quickFacts?.facts?.map((fact) => fact.title),
  );

  return (
    <section className="container relative flex flex-col justify-center space-y-8 border-t py-24">
      {/* Små enheter */}
      <div className="flex h-full flex-col justify-between gap-14 lg:hidden">
        {/* Textblock ovanför bilden */}
        <div className="block space-y-6 p-4">
          <h2 className="title-secondary font-bold">
            {t("introduction.title")}
          </h2>
          <p>{t("introduction.description")}</p>
        </div>

        {/* Bild med overlay */}
        <div className="relative h-[40vh]">
          <Image
            src={urlFor(image).url()}
            alt={image.alt ?? title[locale]}
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-primary/50" />
        </div>

        {/* Textblock under bilden */}
        <div className="block p-4">
          <h2 className="title-secondary">Quick facts</h2>
          <ul className="mt-10 grid list-inside grid-cols-1 gap-14 text-xl sm:grid-cols-2">
            <li className="flex flex-col gap-2">
              <Sofa className="size-14 text-secondary" />
              <span>Local hotspot in Uppsala.</span>
              <p>Mötesplats för studenter och lokalbor i Uppsala.</p>
            </li>
            <li className="flex flex-col gap-2">
              <Pizza className="size-14 text-secondary" />
              <span>Classic pizzas & comfort food.</span>
              <p>Äkta svenska pizzor & andra klassiker.</p>
            </li>
            <li className="flex flex-col gap-2">
              <Beer className="size-14 text-secondary" />
              <span>Friendly, relaxed vibe.</span>
              <p>Vänlig och avslappnad atmosfär.</p>
            </li>
            <li className="flex flex-col gap-2">
              <CreditCard className="size-14 text-secondary" />
              <span>Card payments only.</span>
              <p>Enbart kortbetalning för en smidig upplevelse.</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Stora enheter */}
      <div className="container relative hidden h-[60rem] bg-transparent py-16 lg:block">
        <Image
          src={urlFor(image).url()}
          alt={image.alt ?? title[locale]}
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="grid-template-rows-[auto_1fr_auto] relative grid h-full items-center justify-center gap-10 text-white">
          <div className="mx-auto block space-y-6">
            <h2 className="title-secondary text-center font-bold !text-secondary drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)]">
              Välkommen till Palermo
            </h2>
            <p className="max-w-md justify-self-center text-center text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)]">
              {" "}
              Palermo är mer än en restaurang – det är en mötesplats där
              berättelser blir levande. Här skapas minnen att bevara. Välkommen
              hem, välkommen till Palermo.
            </p>
          </div>
          {/* {quickFacts && (
              quickFacts.facts
            )} */}

          {/* Fakta om Palermo */}
          <Card className="flex flex-col items-center rounded-lg border border-white/15 bg-black/40 p-10 shadow-md shadow-black/20 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="title-tertiary font-bold text-accent-soft-apricot drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)]">
                Fakta om Palermo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="mt-10 grid list-inside grid-cols-1 gap-14 text-xl sm:grid-cols-2">
                {quickFacts?.facts?.map((fact) => {
                  return (
                    <li
                      key={fact.title[locale]}
                      className="flex flex-col gap-2"
                    >
                      <h4 className="size-14 text-secondary" />
                      <span>{fact.title[locale]}</span>
                      <p>{fact.description[locale]}</p>
                    </li>
                  );
                })}
                {/* <li className="flex flex-col gap-2">
                  <Sofa className="drop-shadow-[0_2px_3px rgba(0,0,0,0.4)] mb-2 size-16 text-secondary" />
                  <h4 className="text-2xl text-accent-soft-apricot drop-shadow-[0_1px_2px rgba(0,0,0,0.5)]">
                    Local hotspot in Uppsala.
                  </h4>
                  <p className="font-semibold text-[#C4A484] drop-shadow-[0_2px_3px_rgba(0,0,0,0.2)]">
                    Mötesplats för studenter och lokalbor i Uppsala.
                  </p>
                </li>
                <li className="flex flex-col gap-2">
                  <Pizza className="drop-shadow-[0_2px_3px rgba(0,0,0,0.4)] mb-2 size-16 text-secondary" />
                  <h4 className="drop-shadow-[0_2px_3px rgba(0,0,0,0.2)] text-2xl text-accent-soft-apricot">
                    Classic pizzas & comfort food.
                  </h4>
                  <p className="drop-shadow-[0_2px_3px rgba(0,0,0,0.2)] font-semibold text-[#C4A484]">
                    Äkta svenska pizzor & andra klassiker.
                  </p>
                </li>
                <li className="flex flex-col gap-2">
                  <Beer className="mb-2 size-16 text-secondary drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)]" />
                  <h4 className="drop-shadow-[0_2px_3px rgba(0,0,0,0.2)] text-2xl text-accent-soft-apricot">
                    Friendly, relaxed vibe.
                  </h4>
                  <p className="drop-shadow-[0_2px_3px rgba(0,0,0,0.2)] font-semibold text-[#C4A484]">
                    Vänlig och avslappnad atmosfär.
                  </p>
                </li>
                <li className="flex flex-col gap-2">
                  <CreditCard className="mb-2 size-16 text-secondary drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)]" />
                  <h4 className="drop-shadow-[0_2px_3px rgba(0,0,0,0.2)] text-2xl text-accent-soft-apricot">
                    Card payments only.
                  </h4>
                  <p className="font-semibold text-[#C4A484] drop-shadow-[0_2px_3px_rgba(0,0,0,0.2)]">
                    Enbart kortbetalning för en smidig upplevelse.
                  </p>
                </li> */}
              </ul>
            </CardContent>
            <Button
              size="lg"
              className="bg-accent-soft-apricot text-primary shadow-xl"
            >
              Läs mer...
            </Button>
          </Card>
        </div>
      </div>
      <Button className="sm:self-center lg:hidden">Läs mer...</Button>
    </section>
  );
};

export default AboutUs;
