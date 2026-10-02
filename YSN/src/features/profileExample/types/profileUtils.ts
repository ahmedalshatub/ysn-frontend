export const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-GB", { year: "numeric", month: "2-digit", day: "2-digit" });

export const money = (value: number) =>
  `$${value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
