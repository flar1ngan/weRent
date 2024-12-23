import Categories from "@/components/home/Categories";
import ItemsContainer from "@/components/home/ItemsContainer";
import { Button } from "@/components/ui/button";

function HomePage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  console.log(searchParams);
  return (
    <section>
      <Categories
        category={searchParams.category}
        search={searchParams.search}
      />
      <ItemsContainer
        category={searchParams.category}
        search={searchParams.search}
      />
    </section>
  );
}

export default HomePage;
