type Result<T> = { [key: string]: T[] };

export const toGroup = <T>(
  array: Array<T>,
  keySelector: keyof T | ((item: T) => string)
): Result<T> => {
  const result = array.reduce((acc, item) => {
    const key =
      typeof keySelector === 'function' ? keySelector(item) : `${item[keySelector] ?? ''}`;
    const currentValue = acc[key] ?? [];
    currentValue.push(item);
    acc[key] = currentValue;
    return acc;
  }, {} as Result<T>);
  return result;
};
