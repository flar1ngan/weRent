import { categories } from "@/utils/categories";
import Link from "next/link";

function Categories({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) {
  const searchVar = search ? `&search=${search}` : "";
  return (
    <section>
        <div className="flex flex-col gap-y-2 items-start">
          {categories.map((item) => {
            const isActive = item.label === category;
            return (
              <Link key={item.label} href={`/?category=${item.label}${searchVar}`}>
                <article
                  className={`p-3 flex cursor-pointer duration-300 hover:text-primary w-full ${
                    isActive ? "text-primary" : ""
                  }`}
                >
                  <p className="capitalize text-sm mt-1">{item.label}</p>
                </article>
              </Link>
            );
          })}
        </div>
      
    </section>
  );
}

export default Categories;
