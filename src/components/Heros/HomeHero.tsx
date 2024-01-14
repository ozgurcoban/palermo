import Image from "next/image";
import MaskText from "../ui/MaskText";
import HomeBG from "../../../public/images/home.jpg";

export function HomeHero() {
  return (
    <section className="min-h-[calc(100vh-132px)] w-screen dark-border-image text-light relative overflow-x-hidden">
      <div
        id="home-hero"
        className="xl:px-20 sm:px-10 px-5 w-full flex flex-col items-center gap-20 py-10 pt-20 relative"
      >
        <div className="md:text-[5vw] text-[8vw] w-full">
          <MaskText
            delay={0.8}
            phrases={["Hungry ? Let's meat up"]}
            className="font-recoleta leading-tight uppercase font-bold text-center text-rose-500"
          />
        </div>
        <div className="max-w-full flex sm:flex-row flex-col xl:gap-20 gap-10">
          <div className="flex-1 h-full max-h-[70vh] max-w-screen-xl overflow-y-hidden relative">
            <Image
              src={HomeBG}
              alt="palermo homepage hero's background"
              className="object-cover"
            />
          </div>
          <div className="flex-[0.3] flex flex-col max-h-[70vh] justify-between gap-10">
            <div className="xl:text-5xl md:text-4xl text-3xl">
              <MaskText
                delay={1}
                phrases={[
                  "At Palermo where tasty",
                  "dishes and a fine",
                  "selection of beers",
                ]}
                className="text-gray-200 font-recoleta leading-tight"
              />
            </div>
            <p className="text-light/85">Welcome</p>
          </div>
        </div>
      </div>
    </section>
  );
}
