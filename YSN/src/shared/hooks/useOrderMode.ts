import { useState } from "react";

const useOrderMode = <T>() => {
  const [items, setItems] = useState<T[] | null>(null);

  const move = (fromIndex: number, toIndex: number) =>
    setItems((current) => {
      if (!current) return current;
      const next = [...current];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });

  return { ordering: items !== null, items: items ?? [], start: setItems, move, stop: () => setItems(null) };
};

export default useOrderMode;
