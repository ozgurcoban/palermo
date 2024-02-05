import React from "react";
import FadeUp from "../ui/FadeUp";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface NewsItems {
  news: {
    id: string;
    cover_image: string;
    date: string;
    title: string;
    description: string;
    href: string;
  }[];
}

const NewsItems: React.FC<NewsItems> = ({ news }) => {
  return (
    <div className="mt-36 w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
      {news.map(({ id, cover_image, date, description, href, title }, i) => (
        <FadeUp
          className={`rounded-xl p-4 overflow-hidden flex flex-col border gap-11`}
          key={id}
          delay={0.05 * i}
        >
          {/* <Image src={cover_image} alt={title} width={1920} height={256} className="object-cover" /> */}
          <div className="border-2 border-slate-400/10 bg-neutral-100 h-64 w-full rounded-lg" />
          <div>
            <span className="text-base opacity-80">{date}</span>
            <h3 className="font-recoleta text-3xl">{title}</h3>
            <p className="line-clamp-2 text-base leading-normal mt-4">
              {description}
            </p>
          </div>
          <Link href={href}>
            <button
              title="Read more"
              aria-live="polite"
              className="flex items-center gap-2 lg:mx-0 hover:tracking-wider transition-all duration-300 text-primary"
            >
              <span className="uppercase font-recoleta text-base font-medium">
                Read more
              </span>
              <ArrowRightIcon width={24} height={24} />
            </button>
          </Link>
        </FadeUp>
      ))}
    </div>
  );
};

export default NewsItems;
