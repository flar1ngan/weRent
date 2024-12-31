import ItemCard from "../card/ItemCard";
import type { ItemCardType } from "@/utils/types";

function ItemsList({items}:{items:ItemCardType[]}) {
  return (
    <section className="mt-4 gap-4 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item)=>{
        return <ItemCard key={item.id} item={item} />;
      })}
    </section>
  )
}

export default ItemsList