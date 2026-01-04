import { PropsWithChildren, ReactElement, useCallback, useState } from 'react';
import { SearchInput } from '../searchInput';

type ListViewProps = PropsWithChildren<{
  header: string | ReactElement;
  searchPlaceholder?: string;
  actions?: ReactElement;
  errorMessage?: string;
  showFooter?: boolean;
  footerLabel?: string | ReactElement;
  allowSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}>;

export function ListView({
  header,
  searchPlaceholder,
  actions,
  errorMessage,
  children,
  showFooter,
  footerLabel,
  allowSearch = true,
  onSearchChange,
}: ListViewProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchTerm(value);
      onSearchChange?.(value);
    },
    [onSearchChange]
  );

  return (
    <div className="h-full overflow-hidden flex flex-col p-4">
      {/* Header row with title and actions */}
      <div className="mb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex-grow min-w-0">{header}</div>
          <div className="flex-shrink-0">{actions}</div>
        </div>
      </div>

      {/* Search row */}
      {allowSearch && (
        <div className="mb-6">
          <SearchInput
            placeholder={searchPlaceholder}
            value={searchTerm}
            onSearchChange={handleSearchChange}
          />
        </div>
      )}

      {/* Error message */}
      {errorMessage && (
        <div className="mb-6">
          <div className="alert alert-error">
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      {/* Main content card */}
      <div className="flex-grow overflow-auto">
        <div className="card bg-base-100 shadow-xl h-full flex flex-col">
          <div className="card-body flex-grow overflow-auto p-0">{children}</div>
          {showFooter && (
            <div className="card-actions justify-end p-4 border-t">
              <div className="text-sm opacity-70">{footerLabel}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
