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
  const pageSize = 8;
  const { items, totalCount } = await getItems({
    category,
    search,
    page: currentPage,
    pageSize: pageSize,
  });
  if (items.length === 0) {
    return ( 
      <div className="flex justify-center">
    <EmptyList />
      </div>
  );
  }

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <>
      <ItemsList items={items} />
      <ItemsPagination currentPage={currentPage} totalPages={totalPages}/>
    </>
  );
}

export default ItemsContainer;
