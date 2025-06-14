import React from "react";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import FadeUp from "../ui/FadeUp";
import { IMenuList } from "@/types/generated";
import { useTranslations } from "next-intl";

interface MenuPagination {
  menus_list: IMenuList[];
  PAGE_SIZE: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const MenuPagination: React.FC<MenuPagination> = ({
  menus_list,
  PAGE_SIZE,
  currentPage,
  setCurrentPage,
}) => {
  const t = useTranslations("MenuPage.pagination");
  const indexLength = menus_list ? menus_list.length : 0;

  const nextIndex = Math.ceil((indexLength ?? PAGE_SIZE) / PAGE_SIZE);
  const indexStart =
    indexLength > 0
      ? (currentPage ? currentPage - 1 : 1) * (PAGE_SIZE || 1) + 1
      : 0;
  const indexEnd = menus_list?.length
    ? (menus_list?.length % currentPage) + PAGE_SIZE
    : 0;

  const previousPage = () =>
    setCurrentPage((current) => (current <= 1 ? current : current - 1));

  const nextPage = () =>
    setCurrentPage((current) => (current >= nextIndex ? current : current + 1));

  return (
    <div className="lg:px-20 md:px-10 px-5 py-8 flex flex-col sm:flex-row gap-y-5 items-center justify-center sm:justify-between bg-white bg-opacity-60 backdrop-filter backdrop-blur-sm border-none">
      <FadeUp delay={0.2}>
        <span>
          Showing {indexStart} - {indexEnd} of {indexLength} Items
        </span>
      </FadeUp>
      <FadeUp delay={0.2} className="flex items-center gap-2">
        <button
          onClick={previousPage}
          disabled={1 >= currentPage}
          title="Previous menu list items"
          aria-label={t("previousPage")}
        >
          <ArrowLeftCircle className={1 >= currentPage ? "opacity-50" : ""} />
        </button>
        <span>
          Paper {indexLength > 0 ? currentPage : 0} Of {nextIndex}
        </span>
        <button
          onClick={nextPage}
          disabled={nextIndex <= currentPage}
          title="Next menu list items"
          aria-label={t("nextPage")}
        >
          <ArrowRightCircle
            className={nextIndex <= currentPage ? "opacity-50" : ""}
          />
        </button>
      </FadeUp>
    </div>
  );
};

export default MenuPagination;
