import { useGetLocale } from "@/config";
import Image from "next/image";
import urlFor from "@/lib/urlFor";

// src={urlFor(image).url()}
//  <div className="relative hidden aspect-video w-full lg:block"></div>

const AboutUs = ({ data }: { data?: StorySection }) => {
  const locale = useGetLocale();

  if (!data) return;

  const { title, description, image } = data;
  return (
    <section className="relative">
      {/* För små enheter: Textblock ovanför bilden */}
      <div className="block bg-gray-100 p-4 lg:hidden">
        <h2 className="text-xl font-bold">Textblock 1</h2>
        <p>Detta textblock visas ovanför bilden på små enheter.</p>
      </div>

      <div className="relative h-[60vh]">
        {/* För små enheter: Visa en img med bilden */}
        <Image
          src={urlFor(image).url()}
          alt={image.alt ?? title[locale]}
          fill
          className="object-cover object-center"
        />

        {/* För stora enheter: Visa en div med bakgrundsbild */}
        <Image
          className="absolute inset-0 hidden bg-cover bg-center object-cover object-center lg:block"
          src={urlFor(image).url()}
          alt={image.alt ?? title[locale]}
          fill
        />

        {/* För små enheter: Textblock under bilden */}
        <div className="block bg-gray-100 p-4 lg:hidden">
          <h2 className="text-xl font-bold">Textblock 2</h2>
          <p>Detta textblock visas under bilden på små enheter.</p>
        </div>

        {/* För stora enheter: Overlay med två textblock inuti bakgrundsbilden */}
        <div className="absolute inset-0 hidden flex-col justify-between p-8 text-white lg:flex">
          <div>
            <h2 className="text-3xl font-bold">Textblock 1</h2>
            <p>Detta textblock är placerat högst upp i overlayn.</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold">Textblock 2</h2>
            <p>Detta textblock är placerat längst ner i overlayn.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
