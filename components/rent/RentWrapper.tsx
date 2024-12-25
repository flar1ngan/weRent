"use client";

import { useEffect } from "react";
import { useItem } from "@/utils/store";
import { RentType } from "@/utils/types";
import RentCalendar from "./RentCalendar";
import RentContainer from "./RentContainer";

type RentWrapperType = {
  itemId: string;
  price: number;
  rents: RentType[];
};

function RentWrapper({ itemId, price, rents }: RentWrapperType) {
  useEffect(() => {
    useItem.setState({
      itemId,
      price,
      rents,
    });
  }, []);
  return (
    <>
      <RentCalendar />
      <RentContainer />
    </>
  );
}

export default RentWrapper;
