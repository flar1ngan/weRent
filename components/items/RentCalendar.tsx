"use client";
import { useState } from "react";
import { Calendar } from "../ui/calendar";
import { DateRange } from "react-day-picker";

function RentCalendar() {
  const currentDate = new Date();
  const selected: DateRange = {
    from: undefined,
    to: undefined,
  };
  const [range, setRange] = useState<DateRange | undefined>(selected);
  return <Calendar mode="range" defaultMonth={currentDate} selected={range} onSelect={setRange}/>
}

export default RentCalendar;
