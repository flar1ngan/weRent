import Image from "next/image";
import Link from "next/link";
import ItemRating from "./ItemRating";
import FavoriteButton from "./FavoriteButton";
import { ItemCardType } from "@/utils/types";
import { formatCurrency } from "@/utils/format";

function ItemCard({ item }: { item: ItemCardType }) {
  const { name, image, price } = item;
  const { city, id: itemId } = item;

  return (
    <article className="group relative">
      <Link href={`/items/${itemId}`}>
        <div className="relative h-[300px] mb-2 overflow-hidden rounded-md">
          <Image
            src={image}
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            alt={name}
            className="rounded-md object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="h-10 flex justify-between items-start">
          <h3 className="text-sm font-semibold w-[75%] break-words">
            {name.substring(0, 40)}
          </h3>
          <ItemRating inPage={false} itemId={itemId} />
        </div>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm">
            <span className="font-semibold">{formatCurrency(price)} </span>
            dienā
          </p>
          <p className="text-sm">{city}</p>
        </div>
      </Link>
      <div className="absolute top-5 right-5 z-10">
        <FavoriteButton itemId={itemId} />
      </div>
    </article>
  );
}

export default ItemCard;
