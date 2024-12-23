import { getItems } from "@/utils/actions";
import ItemsList from "./ItemsList";
import EmptyList from "./EmptyList";
import { ItemCardType } from "@/utils/types";

async function ItemsContainer({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) {
  const items: ItemCardType[] = await getItems({
    category,
    search,
  });
  if (items.length === 0) {
    return (
      <EmptyList

      />
    );
  }

  return <ItemsList items={items} />;
}

export default ItemsContainer;
