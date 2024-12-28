import { getItems } from "@/utils/actions";
import ItemsList from "./ItemsList";
import EmptyList from "./EmptyList";
import ItemsPagination from "./ItemsPagination";

async function ItemsContainer({
  category,
  search,
  page,
}: {
  category?: string;
  search?: string;
  page?: string;
}) {
  const currentPage = page ? parseInt(page, 10) : 1;
  const PAGE_SIZE = 6;
  const { items, totalCount } = await getItems({
    category,
    search,
    page: currentPage,
    pageSize: PAGE_SIZE,
  });
  if (items.length === 0) {
    return <EmptyList />;
  }

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <>
      <ItemsList items={items} />
      <ItemsPagination currentPage={currentPage} totalPages={totalPages}/>
    </>
  );
}

export default ItemsContainer;
