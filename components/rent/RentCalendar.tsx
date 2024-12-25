"use client";

import { Calendar } from "../ui/calendar";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { DateRange } from "react-day-picker";
import { useItem } from "@/utils/store";

import {
  getBlockedDates,
  getDateRange,
  defaultSelected,
  getBlockedPeriods,
} from "@/utils/calendar";

function RentCalendar() {
  const currentDate = new Date();
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  const rents = useItem((state) => state.rents);
  const {toast} = useToast()

  const blockedPeriods = getBlockedPeriods({
    rents,
    today: currentDate,
  });

  const takenDates = getBlockedDates(blockedPeriods)
  useEffect(() => {
    const selectedRange = getDateRange(range)
    selectedRange.some((date)=>{
      if(takenDates[date]){
        setRange(defaultSelected)
        toast({
          description:"Ir izvēlētas rezervētas dienas. Lūdzu meģiniet vēlreiz"
        });
        return true
      }
      return false;
    })
    useItem.setState({ range });
  }, [range]);

  return (
    <Calendar
      mode="range"
      defaultMonth={currentDate}
      selected={range}
      onSelect={setRange}
      className="mb-4"
      disabled={blockedPeriods}
    />
  );
}

export default RentCalendar;
