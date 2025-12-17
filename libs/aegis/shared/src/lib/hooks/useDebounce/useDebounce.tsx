import { useEffect, useState } from 'react';

export function useDebounce(value: string, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    // Cleanup on unmount or when value changes
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
