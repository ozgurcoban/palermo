"use client"
import React, { useRef } from "react";
import InfiniteMove from "../ui/InfiniteMove";

type Props = {
    images: any[];
    IMAGE_BY_ROW: number;
    direction: number
}

const WallItem: React.FC<Props> = ({ IMAGE_BY_ROW, images, direction }) => {

    const firstList = useRef<HTMLDivElement | null>(null)
    const secondList = useRef<HTMLDivElement | null>(null)
    return (
        <div
            className={`relative w-full`}
        >
            <InfiniteMove direction={direction} firstList={firstList} secondList={secondList} />
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