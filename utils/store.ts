import { create } from "zustand";
import { RentType } from "./types";
import { DateRange } from "react-day-picker";

type ItemState = {
  itemId: string;
  price: number;
  rents: RentType[];
  range: DateRange | undefined;
};

export const useItem = create<ItemState>(() => {
  return {
    itemId: "",
    price: 0,
    rents: [],
    range: undefined,
  };
});

