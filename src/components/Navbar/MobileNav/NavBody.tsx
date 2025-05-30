import { motion } from "framer-motion";
import { Link } from "@/navigation";
import { blur, translate } from "../anim";

interface INavBody {
  links: { title: string; href: string; src: string }[];
  selectedLink: {
    isActive: boolean;
    index: number;
  };
  setSelectedLink: React.Dispatch<
    React.SetStateAction<{
      isActive: boolean;
      index: number;
    }>
  >;
  onClick: () => void;
}

export default function NavBody({
  links,
  selectedLink,
  setSelectedLink,
  onClick,
}: INavBody) {
  const getChars = (word: string) => {
    let chars: React.ReactNode[] = [];
    word.split("").forEach((char, i) => {
      chars.push(
        <motion.span
          custom={[i * 0.02, (word.length - i) * 0.01]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
          key={char + i}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      );
    });
    return chars;
  };

  return (
    <div
      className={
        "flex lg:justify-normal justify-start px-8 lg:px-0 h-full mt-10 lg:mt-20 lg:max-w-7xl gap-4"
      }
    >
      {links.map((link, index) => {
        const { title, href } = link;
        return (
          <Link
            onClick={onClick}
            key={`l_${index}`}
            href={href as any}
            className="uppercase"
          >
            <motion.p
              className="font-recoleta flex overflow-hidden text-md sm:text-xl py-3 lg:text-[5vw] lg:pr-[2vw]"
              onMouseOver={() => {
                setSelectedLink({ isActive: true, index });
              }}
              onMouseLeave={() => {
                setSelectedLink({ isActive: false, index });
              }}
              variants={blur}
              animate={
                selectedLink.isActive && selectedLink.index != index
                  ? "open"
                  : "closed"
              }
            >
              {getChars(title)}
            </motion.p>
          </Link>
        );
      })}
    </div>
  );
}
