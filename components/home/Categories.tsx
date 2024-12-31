import { categories } from "@/utils/categories";
import Link from "next/link";
import { Card } from "../ui/card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

function Categories({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) {
  const buildHref = (itemLabel: string, isActive: boolean) => {
    if (isActive) {
      return search ? `/?search=${search}` : "/";
    } else {
      return search
        ? `/?category=${itemLabel}&search=${search}`
        : `/?category=${itemLabel}`;
    }
  };

  return (
    <section>
      <Card className="px-2">
        <ScrollArea>
          <div className="flex justify-between items-center">
            {categories.map((item) => {
              const isActive = item.label === category;

              return (
                <Link key={item.label} href={buildHref(item.label, isActive)}>
                  <article
                    className={`p-3 whitespace-nowrap flex cursor-pointer duration-300 hover:text-primary-foreground hover:bg-primary w-full ${
                      isActive ? "text-primary-foreground bg-primary" : ""
                    }`}
                  >
                    <p className="capitalize text-sm font-medium">{item.label}</p>
                  </article>
                </Link>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Card>
    </section>
  );
}

export default Categories;
