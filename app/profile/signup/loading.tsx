"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="flex justify-center">
      <Skeleton className="w-[550px] h-[200px]" />
    </div>
  );
}
