export const toRecord = <T>(
  array: T[],
  keySelector: (keyof T extends string | number | symbol ? keyof T : never) | ((item: T) => string),
  initialValue?: Record<string | number | symbol, T>
): Record<string | number | symbol, T> => {
  const result = array.reduce(
    (acc, item) => {
      const key =
        typeof keySelector === 'function' ? keySelector(item) : `${item[keySelector] ?? ''}`;
      acc[key] = item;
      return acc;
    },
    initialValue ? { ...initialValue } : {}
  );
  return result;
};
