"use client";

import { useSearchParams, useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function ItemsPagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);

    if (page > 1) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }
    router.replace(`/?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => goToPage(currentPage - 1)}
              className="cursor-pointer"
            />
          </PaginationItem>
        )}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink
              className="cursor-pointer"
              onClick={() => goToPage(currentPage - 1)}
            >
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink
            className="cursor-pointer"
            onClick={() => goToPage(currentPage)}
            isActive
          >
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        {totalPages >= currentPage + 1 && (
          <PaginationItem>
            <PaginationLink
              className="cursor-pointer"
              onClick={() => goToPage(currentPage + 1)}
            >
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {totalPages > currentPage + 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {totalPages > currentPage && (
          <PaginationItem>
            <PaginationNext
              onClick={() => goToPage(currentPage + 1)}
              className="cursor-pointer"
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
