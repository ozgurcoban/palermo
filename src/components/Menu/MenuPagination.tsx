import React from "react";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import FadeUp from "../ui/FadeUp";

interface MenuPagination {
  menus_list:
    | {
        title: string;
        description: string;
        price: string;
      }[]
    | undefined;
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
    <div className="lg:px-20 md:px-10 px-5 py-8 flex flex-col sm:flex-row gap-y-5 items-center justify-center sm:justify-between">
      <FadeUp delay={2.7}>
        <span>
          Showing {indexStart} - {indexEnd} of {indexLength} Items
        </span>
      </FadeUp>
      <FadeUp delay={2.9} className="flex items-center gap-2">
        <button
          onClick={previousPage}
          disabled={1 >= currentPage}
          title="Previous menu list items"
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
