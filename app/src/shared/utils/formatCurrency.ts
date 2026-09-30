export const formatCurrency = (amount?: number | null): string => {
  if (amount === null || amount === undefined) return "0 د.ع";

  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return `${formatted} د.ع`;
};

export const formatAmount = (amount?: number | null): string => {
  if (amount === null || amount === undefined) return "0";

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
