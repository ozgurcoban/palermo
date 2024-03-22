"use client";
import React, { useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
type Props = {
  firstList: React.MutableRefObject<HTMLDivElement | null>;
  secondList: React.MutableRefObject<HTMLDivElement | null>;
  direction: number;
};

const InfiniteMove: React.FC<Props> = ({
  firstList,
  secondList,
  direction = 1,
}) => {
  let xPercent = 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(secondList.current, {
        left: secondList.current?.getBoundingClientRect().width,
      });
      requestAnimationFrame(animate);
    });

    return () => ctx.revert(); // <-- cleanup
  }, []);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    if (secondList.current && firstList.current) {
      gsap.set(firstList.current, { xPercent: xPercent });
      gsap.set(secondList.current, { xPercent: xPercent });
      requestAnimationFrame(animate);
      xPercent += 0.025 * direction;
    }
  };
  return null;
};

export default InfiniteMove;
