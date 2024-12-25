import { DateRange } from 'react-day-picker';
import { RentType} from '@/utils/types';

export const defaultSelected: DateRange = {
  from: undefined,
  to: undefined,
};

export const getBlockedPeriods = ({
  rents,
  today,
}: {
  rents: RentType[];
  today: Date;
}) => {
  today.setHours(0, 0, 0, 0);

  const blockedDays: DateRange[] = [
    ...rents.map((rent) => ({
      from: rent.startDate,
      to: rent.endDate,
    })),
    {
      from: new Date(0),
      to: new Date(today.getTime() - 24 * 60 * 60 * 1000),
    },
  ];
  return blockedDays;
};

export const getDateRange = (range: DateRange | undefined): string[] => {
  if (!range || !range.from || !range.to) return [];

  let currentDate = new Date(range.from);
  const endDate = new Date(range.to);
  const dateRange: string[] = [];

  while (currentDate <= endDate) {
    const dateString = currentDate.toISOString().split('T')[0];
    dateRange.push(dateString);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateRange;
};

export const getBlockedDates = (
  blockedDays: DateRange[]
): { [key: string]: boolean } => {
  if (blockedDays.length === 0) return {};

  const blockedDates: { [key: string]: boolean } = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  blockedDays.forEach((range) => {
    if (!range.from || !range.to) return;

    let currentDate = new Date(range.from);
    const endDate = new Date(range.to);

    while (currentDate <= endDate) {
      if (currentDate < today) {
        currentDate.setDate(currentDate.getDate() + 1);
        continue;
      }
      const dateString = currentDate.toISOString().split('T')[0];
      blockedDates[dateString] = true;
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });

  return blockedDates;
};

export function getDaysBetween({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) {
  const diffInMs = Math.abs(endDate.getTime() - startDate.getTime());

  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  return diffInDays;
}

type RentDetails = {
    startDate: Date;
    endDate: Date;
    price: number;
}

export const calculateTotal = ({startDate, endDate, price}:RentDetails) => {
    const totalDays = getDaysBetween({startDate, endDate});
    const totalPrice = totalDays * price
    return {totalDays, totalPrice};
}