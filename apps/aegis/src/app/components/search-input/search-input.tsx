import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import useDebounce from '../../hooks/useDebounce';

type SearchProps = {
  placeholder?: string;
  value: string;
  className?: string;
  onSearchChange: (value: string) => void;
};

function SearchInput({ placeholder, value, className, onSearchChange }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState(value);
  const debouncedValue = useDebounce(searchTerm, 400);

  useEffect(() => {
    onSearchChange(debouncedValue);
  }, [debouncedValue, onSearchChange]);

  return (
    <Form.Control
      type="text"
      placeholder={placeholder}
      className={className}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

export default SearchInput;
