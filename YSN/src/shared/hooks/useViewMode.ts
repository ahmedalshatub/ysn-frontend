import { useState } from "react";
import { ViewMode, type ViewModeType } from "../types/ViewMode.types";

const storageKey = (page: string) => `viewMode:${page}`;

const readViewMode = (page: string): ViewModeType => {
  try {
    const stored = localStorage.getItem(storageKey(page));
    return stored === ViewMode.Table ? ViewMode.Table : ViewMode.Cards;
  } catch {
    return ViewMode.Cards;
  }
};

const useViewMode = (page: string) => {
  const [viewMode, setViewModeState] = useState<ViewModeType>(() => readViewMode(page));

  const setViewMode = (mode: ViewModeType) => {
    setViewModeState(mode);
    try {
      localStorage.setItem(storageKey(page), mode);
    } catch {
      return;
    }
  };

  return [viewMode, setViewMode] as const;
};

export default useViewMode;
