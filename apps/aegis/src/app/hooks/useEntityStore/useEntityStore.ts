import { useCallback, useMemo, useState } from 'react';
import { toRecord } from '../../utils/toMap';

type StoreState<T> = {
  items: T[];
  map: Record<string, T>;
};

export function useEntityStore<T>(keySelector: (item: T) => string) {
  const [state, setState] = useState<StoreState<T>>({ items: [], map: {} });

  const addMany = useCallback(
    (incoming: T[]) => {
      const newMap = toRecord(incoming, keySelector);
      setState(({ items, map }) => {
        // Create a new ordered list without duplicates
        const merged = [
          ...items.map((i) => newMap[keySelector(i)] ?? i), // keep existing items (but ensure not removed)
          ...incoming.filter((i) => !map[keySelector(i)]), // append new ones
        ];

        // update map state
        return {
          items: merged,
          map: { ...map, ...newMap },
        };
      });
    },
    [keySelector]
  );

  const items = useMemo(() => state.items, [state.items]);
  const map = useMemo(() => state.map, [state.map]);

  const addOne = useCallback(
    (item: T) => {
      addMany([item]);
    },
    [addMany]
  );

  const getByKey = useCallback((id: string) => map[id], [map]);

  const clear = useCallback(() => {
    setState({ items: [], map: {} });
  }, []);

  const deleteOne = useCallback(
    (id: string) => {
      setState(({ items, map }) => {
        const newItems = items.filter((item) => keySelector(item) !== id);
        const newMap = { ...map };
        delete newMap[id];
        return { items: newItems, map: newMap };
      });
    },
    [keySelector]
  );

  return {
    items,
    addOne,
    addMany,
    getByKey,
    clear,
    deleteOne,
  };
}
