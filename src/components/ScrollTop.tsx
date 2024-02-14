"use client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

const ScrollTop = () => {
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const { scrollY } = window;
      setShowBtn(scrollY > 132);
    };
    //add eventlistener to window
    window.addEventListener("scroll", onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <a href="#navbar">
      <button
        title="Scroll Top"
        aria-label="Scroll Top"
        className={`fixed z-20 right-10 bottom-10 border bg-light rounded-full p-3 flex items-center justify-center transition-all duration-500 ${
          showBtn ? "opacity-100" : "opacity-0"
        }`}
      >
        <ArrowUpIcon width={28} height={28} />
      </button>
    </a>
  );
};

export default ScrollTop;
