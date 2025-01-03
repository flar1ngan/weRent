"use client";
import { Input } from "../ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";

function NavbarSearch() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [search, setSearch] = useState(
    searchParams.get("search")?.toString() || ""
  );
  const handleSearch = useDebouncedCallback((value:string) => {
    const params = new URLSearchParams(searchParams)
    if (params.has("page")) {
      params.delete("page"); 
    }
    if(value){
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`/?${params.toString()}`)
  }, 500);

  useEffect(()=>{
    if(!searchParams.get("search")) {
      setSearch("");
    }
  },[searchParams.get("search")])

  return (
    <Input
      type="text"
      placeholder="Mēklēt..."
      className="max-w-md dark:bg-muted h-10"
      value={search}
      onChange={(e)=>{
        setSearch(e.target.value);
        handleSearch(e.target.value)
      }}
    />
  );
}

export default NavbarSearch;
