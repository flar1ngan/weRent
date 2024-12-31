import {FaStar} from "react-icons/fa";
import { getItemRating } from "@/utils/actions";

async function ItemRating({ itemId, inPage }: { itemId: string; inPage: boolean }) {
  const {rating, count} = await getItemRating(itemId)
  if(count===0) return null;

  const className = `flex gap-1 items-center ${inPage ? "text-md" : "text-xs text-primary"}`;
  const countText = count > 1 ? "atsauksmes" : "atsauksme";
  const countValue = `(${count}) ${inPage ? countText : ""}`;

  return <div className={className}>
    <FaStar className="w-3 h-3"/>
    {rating} {countValue}
  </div>;
}

export default ItemRating;
