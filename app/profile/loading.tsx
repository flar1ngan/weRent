"use client"
import { Skeleton } from "@/components/ui/skeleton"

function loading() {
  return (
    <div className="flex gap-x-6">
    <Skeleton className="w-[256px] h-[256px] rounded mb-2" />
    <div>
      <Skeleton className="w-80 h-10 mb-2"/>
      <Skeleton className="w-40 h-8 mb-8"/>
    </div>
  </div>
  )
}

export default loading