import { useState } from "react";

const useOrderMode = <T>() => {
  const [items, setItems] = useState<T[] | null>(null);
  const [scopeId, setScopeId] = useState<number | null>(null);

  const start = (nextScopeId: number, nextItems: T[]) => {
    setScopeId(nextScopeId);
    setItems(nextItems);
  };

  const move = (fromIndex: number, toIndex: number) =>
    setItems((current) => {
      if (!current) return current;
      const next = [...current];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });

  const stop = () => {
    setItems(null);
    setScopeId(null);
  };

  return { ordering: items !== null, items: items ?? [], scopeId, start, move, stop };
};

export default useOrderMode;
