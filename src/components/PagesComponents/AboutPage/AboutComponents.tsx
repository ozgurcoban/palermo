import React from "react";
import PageTransition from "@/components/ui/PageTransition";
import Banner from "@/components/Banner";
import { AboutHero } from "../../Heros";
import NationEveryone from "../../NationEveryone";
import {
  FirstSection,
  FourthSection,
  SecondSection,
  ThirdSection,
  WelcomeSection,
} from "../../Sections";

type Props = {
  aboutData: AboutPage;
};

const AboutComponents: React.FC<Props> = ({ aboutData }) => {
  const { images, banner, sections } = aboutData;
  return (
    <PageTransition>
      <AboutHero images={images} />
      {banner && <Banner banners={banner} />}
      <NationEveryone />
      {sections && (
        <>
          {sections[0] && <FirstSection section={sections[0]} />}
          {sections[1] && <SecondSection section={sections[1]} />}
          {sections[2] && <ThirdSection section={sections[2]} />}
          {sections[3] && <FourthSection section={sections[3]} />}
        </>
      )}
      <WelcomeSection />
    </PageTransition>
  );
};

export default AboutComponents;
