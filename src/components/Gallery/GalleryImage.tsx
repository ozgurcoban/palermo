import { HeartIcon } from "lucide-react";
import FadeUp from "../ui/FadeUp";
import { useEffect, useState } from "react";
import Image from "next/image";

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

  useEffect(() => {
    setIsFavourite(favouriteList.includes(imageId));
  }, [favouriteList, imageId]);

  const handleChangeFavourite = () => {
    const favourite = !isFavourite;
    setIsFavourite(favourite);
    const updatedList = favourite
      ? [...favouriteList, imageId]
      : favouriteList.filter(id => id !== imageId);
    setFavouriteList(updatedList);
    localStorage.setItem("favList", JSON.stringify(updatedList));
  };

  return (
    <FadeUp
      delay={0.05 * i}
      className={`relative cursor-pointer overflow-hidden row-span-1 rounded p-4 ${
        index === 3 || index === 6
          ? "lg:col-span-2"
          : index === 2 || index === 5
          ? "lg:col-span-1 sm:col-span-2"
          : ""
      }`}
    >
      <Image
        src={src}
        alt={src}
        fill
        loading="lazy"
        className="object-cover hover:scale-105 transition-all duration-500"
      />
      <button
        title="favourite"
        onClick={handleChangeFavourite}
        className="absolute top-3 right-3 outline-none"
      >
        {isFavourite ? (
          <HeartIcon size={24} fill="red" stroke="none" />
        ) : (
          <HeartIcon size={24} className="text-white " />
        )}
      </button>
    </FadeUp>
  );
};

export default GalleryImage;
