"use client"
import { HeartIcon } from 'lucide-react';
import FadeUp from '../ui/FadeUp';
import { useEffect, useState } from 'react';
// import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';

type Props = {
    i: number;
    imageId: string;
    favouriteList: string[];
    setFavouriteList: React.Dispatch<React.SetStateAction<string[]>>
}

const GalleryImage: React.FC<Props> = ({ imageId, i, favouriteList, setFavouriteList }) => {
    const index = i % 10;

    const [isFavourite, setIsFavourite] = useState(false);
    
    useEffect(() => {
setIsFavourite(favouriteList.includes(imageId))
    }, [favouriteList, imageId])

    const handleChangeFavourite = () => {
        const favourite = !isFavourite
        setIsFavourite(favourite)
        const updatedList = favourite ? [...favouriteList, imageId] : favouriteList.filter(id => id !== imageId)
        setFavouriteList(updatedList);
        localStorage.setItem("favList", JSON.stringify(updatedList));
    }

    return (
        <FadeUp
            delay={0.05 * i}
            className={`relative row-span-1 rounded-xl border-2 border-slate-400/10 bg-neutral-100 p-4 ${index === 3 || index === 6
                ? "lg:col-span-2"
                : index === 2 || index === 5
                    ? "lg:col-span-1 sm:col-span-2"
                    : ""
                }`}
        >
            <button title='favourite' onClick={handleChangeFavourite} className='absolute top-2 right-2 outline-none'>
                {
                    isFavourite ?
                        <HeartIcon size={20} fill='red' stroke='none' />
                        : <HeartIcon size={20} />
                }
            </button>
        </FadeUp>
    );
}

export default GalleryImage