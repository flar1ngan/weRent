import LoadingCard from "@/components/card/LoadingCard";
import Categories from "@/components/home/Categories";
import ItemsContainer from "@/components/home/ItemsContainer";
import { Suspense } from "react";

function HomePage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string; page?:string };
}) {
  console.log(searchParams);
  return (
    <section>
      <Categories
        category={searchParams.category}
        search={searchParams.search}
      />
      <Suspense fallback={<LoadingCard />}>
        <ItemsContainer
          category={searchParams.category}
          search={searchParams.search}
          page={searchParams.page}
        />
      </Suspense>
    </section>
  );
}

export default HomePage;
