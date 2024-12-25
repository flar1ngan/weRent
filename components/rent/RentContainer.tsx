"use client"

import { useItem } from "@/utils/store";
import RentSubmit from "./RentSubmit";
import RentForm from "./RentForm";


function RentContainer() {
  const {range} = useItem((state)=>state);
  if(!range || !range.from || !range.to) return null;
  if(range.to.getTime() === range.from.getTime()) return null;

  return <div className="w-full">
    <RentForm />
    <RentSubmit />

  </div>
}

export default RentContainer