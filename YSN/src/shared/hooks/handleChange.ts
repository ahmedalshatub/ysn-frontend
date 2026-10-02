export default function handleChange<T>(
  func: React.Dispatch<React.SetStateAction<T>>,
  property: keyof T | null,
  value: any
): void {
  if (property != null) {
    func((prevValue) => ({
      ...(prevValue as object),
      [property]: value,
    }) as T);
  } else {
    func(value);
  }
}

export function handleUpdateItems<T extends { id: string | number }>(
  id: string | number,
  key: keyof T,
  value: any,
  oldItems: T[],
  func: React.Dispatch<React.SetStateAction<T[]>>
): void {
  const items = [...oldItems];
  const index = items.findIndex((x) => x.id === id);

  if (index !== -1) {
    items[index] = { ...items[index], [key]: value };
    func(items);
  }
}

export function handleDeleteItem<T extends { id: string | number }>(
  id: string | number,
  oldItems: T[],
  func: React.Dispatch<React.SetStateAction<T[]>>
): void {
  const items = oldItems.filter((item) => item.id !== id);
  func(items);
}

export function handleAddItem<T>(
  newItem: T,
  oldItems: T[],
  func: React.Dispatch<React.SetStateAction<T[]>>
): void {
  func([...oldItems, newItem]);
}

export function handleToggleItem<T extends { id: string | number }>(
  id: string | number,
  key: keyof T,
  oldItems: T[],
  func: React.Dispatch<React.SetStateAction<T[]>>
): void {
  const items = [...oldItems];
  const index = items.findIndex((x) => x.id === id);

  if (index !== -1) {
    items[index] = {
      ...items[index],
      [key]: !items[index][key]
    };
    func(items);
  }
}

export function handleReorderItems<T>(
  oldIndex: number,
  newIndex: number,
  oldItems: T[],
  func: React.Dispatch<React.SetStateAction<T[]>>
): void {
  const items = [...oldItems];
  const [removed] = items.splice(oldIndex, 1);
  items.splice(newIndex, 0, removed);
  func(items);
}
