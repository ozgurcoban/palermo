import React from "react";
import { translate } from "../anim";
import { motion } from "framer-motion";
import { locales } from "@/config";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
import Localization from "@/components/localization";

const NavFooter = ({ onCloseMenu }: { onCloseMenu: () => void }) => {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onSelectChange(nextLocale: string) {
    onCloseMenu();
    // @ts-ignore
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div
      className={
        "flex items-end flex-wrap text-xs uppercase mt-10 justify-end lg:pl-1 lg:p-0 px-8"
      }
    >
      <ul className="w-1/2 lg:w-auto mt-2 overflow-hidden">
        <motion.li
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
        ></motion.li>
      </ul>

      <ul className="w-auto mt-2 overflow-hidden flex gap-2 justify-end">
        <motion.li
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
          className={""}
        >
          <Localization text="Navigation.mobile.siteLanguage" />
        </motion.li>
        {locales.map(cur => (
          <motion.li
            custom={[0.3, 0]}
            variants={translate}
            initial="initial"
            animate="enter"
            exit="exit"
            key={cur}
            onClick={() => onSelectChange(cur)}
            className={`cursor-pointer ${
              locale === cur ? "text-[#9f9689]" : ""
            }`}
          >
            {t("locale", { locale: cur })}
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default NavFooter;
