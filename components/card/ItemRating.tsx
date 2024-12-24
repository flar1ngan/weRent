import {FaStar} from "react-icons/fa";

function ItemRating({ itemId, inPage }: { itemId: string; inPage: boolean }) {
  const rating = 4.2;
  const count = 100;
  console.log(itemId);

  const className = `flex gap-1 items-center ${inPage ? "text-md" : "text-xs"}`;
  const countText = count > 1 ? "atsauksmes" : "atsauksme";
  const countValue = `(${count}) ${inPage ? countText : ""}`;

  return <span className={className}>
    <FaStar className="w-3 h-3"/>
    {rating} {countValue}
  </span>;
}

export default ItemRating;
