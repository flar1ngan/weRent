import { getFavorites } from "@/utils/actions";
import EmptyList from "@/components/home/EmptyList";
import ItemsList from "@/components/home/ItemsList";

async function FavoritesPage() {
  const favorites = await getFavorites();
  if (favorites.length === 0) {
    return <EmptyList />;
  }

  return <ItemsList items={favorites} />;
}

export default FavoritesPage;
