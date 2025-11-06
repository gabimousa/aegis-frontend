type key = string | number | symbol;

export const toGroup = <T>(
  array: Array<T>,
  keySelector: keyof T | ((item: T) => keyof T | string)
): Record<key, T[]> => {
  const result = array.reduce((acc, item) => {
    const key = typeof keySelector === 'function' ? keySelector(item) : keySelector;
    const currentValue = acc[key] ?? [];
    currentValue.push(item);
    acc[key] = currentValue;
    return acc;
  }, {} as Record<key, T[]>);
  return result;
};
