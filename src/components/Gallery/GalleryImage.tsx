import { HeartIcon } from "lucide-react";
import FadeUp from "../ui/FadeUp";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  i: number;
  imageId: string;
  src: string;
  favouriteList: string[];
  setFavouriteList: React.Dispatch<React.SetStateAction<string[]>>;
};

const GalleryImage: React.FC<Props> = ({
  imageId,
  i,
  src,
  favouriteList,
  setFavouriteList,
}) => {
  const index = i % 10;

  const [isFavourite, setIsFavourite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsFavourite(favouriteList.includes(imageId));
  }, [favouriteList, imageId]);

  const handleChangeFavourite = () => {
    const favourite = !isFavourite;
    setIsFavourite(favourite);
    const updatedList = favourite
      ? [...favouriteList, imageId]
      : favouriteList.filter((id) => id !== imageId);
    setFavouriteList(updatedList);
    localStorage.setItem("favList", JSON.stringify(updatedList));
  };

  return (
    <FadeUp
      delay={0.05 * i}
      className={`relative row-span-1 cursor-pointer overflow-hidden rounded p-4 ${
        index === 3 || index === 6
          ? "lg:col-span-2"
          : index === 2 || index === 5
            ? "sm:col-span-2 lg:col-span-1"
            : ""
      }`}
    >
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}
      
      <Image
        src={src}
        alt={`Gallery image ${i + 1}`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        loading={i < 6 ? "eager" : "lazy"}
        priority={i < 3}
        className={cn(
          "object-cover transition-all duration-700",
          isLoading ? "opacity-0" : "opacity-100 hover:scale-105"
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setIsError(true);
        }}
      />
      
      {/* Error state */}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-sm text-gray-500">Failed to load image</span>
        </div>
      )}
      {/* TODO: add value of amount of likes */}
      {/* <button
        title="favourite"
        onClick={handleChangeFavourite}
        className="absolute top-3 right-3 outline-none"
      >
        {isFavourite ? (
          <HeartIcon size={24} fill="red" stroke="none" />
        ) : (
          <HeartIcon size={24} className="text-white " />
        )}
      </button> */}
    </FadeUp>
  );
};

export default GalleryImage;
