import { useEffect, useState } from 'react';
import { useDebounce } from '@aegis/shared';

type SearchProps = {
  placeholder?: string;
  value: string;
  className?: string;
  onSearchChange: (value: string) => void;
};

export function SearchInput({ placeholder, value, className, onSearchChange }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState(value);
  const debouncedValue = useDebounce(searchTerm, 400);

  useEffect(() => {
    onSearchChange(debouncedValue);
  }, [debouncedValue, onSearchChange]);

  return (
    <input
      type="text"
      placeholder={placeholder}
      className={`input input-bordered w-full ${className || ''} outline-none`}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
