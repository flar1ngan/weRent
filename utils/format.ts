export const formatCurrency = (amount: number | null) => {
  const value = amount || 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatDate = (date: Date) => {
  const formattedDate = new Intl.DateTimeFormat("lv-LV", {
    day: "numeric",
    month: "long",
  }).format(date);
  const year = date.getFullYear();
  return `${formattedDate}, ${year}`;
};

export const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};
