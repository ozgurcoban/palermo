"use client"
import gsap from "gsap";
import React, { useEffect, useRef } from "react";

type Props = {
    images: any[];
    IMAGE_BY_ROW: number;
    direction: number
}

const WallItem: React.FC<Props> = ({ IMAGE_BY_ROW, images, direction }) => {
    let xPercent = 0;

    const slider = useRef<HTMLDivElement | null>(null)
    const firstList = useRef<HTMLDivElement | null>(null)
    const secondList = useRef<HTMLDivElement | null>(null)


    useEffect(() => {
        gsap.set(secondList.current, { left: secondList.current?.getBoundingClientRect().width })
        requestAnimationFrame(animate);
    }, [])

    const animate = () => {
        if (xPercent < -100) {
            xPercent = 0;
        }
        else if (xPercent > 0) {
            xPercent = -100;
        }


        gsap.set(firstList.current, { xPercent: xPercent })
        gsap.set(secondList.current, { xPercent: xPercent })
        requestAnimationFrame(animate);
        xPercent += 0.02 * direction;

    }
    return (
        <div
            className={`relative w-full`}
            ref={slider}
        >
            <div ref={firstList}
                style={{ gridTemplateColumns: `repeat(${IMAGE_BY_ROW}, minmax(0, 1fr))` }}
                className="relative grid w-max gap-8">
                {images.map((_, imageIndex) => {
                    return (
                        <div
                            key={`wall-image-${imageIndex}`}
                            className={`relative rounded-xl border-2 border-slate-400/10 bg-neutral-100 w-72 h-72 xl:w-96 xl:h-96`}
                        />
                    );
                })}
            </div>
            <div ref={secondList}
                style={{ gridTemplateColumns: `repeat(${IMAGE_BY_ROW}, minmax(0, 1fr))` }}
                className="absolute left-full top-0 grid w-max gap-8 pl-8">
                {images.map((_, imageIndex) => {
                    return (
                        <div
                            key={`wall-image-${imageIndex}`}
                            className={`relative rounded-xl border-2 border-slate-400/10 bg-neutral-100 w-72 h-72 xl:w-96 xl:h-96`}
                        />
                    );
                })}
            </div>
        </div>
    )
}

export default WallItem