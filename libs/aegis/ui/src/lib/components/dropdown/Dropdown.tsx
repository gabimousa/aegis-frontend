import { ReactNode } from 'react';

type DropdownProps<T> = {
  label: ReactNode;
  buttonColor?: 'primary' | 'secondary' | 'accent' | 'ghost';
  items: Array<T> | ReadonlyArray<T>;
  labelSelector: (item: T) => string;
  disabled?: boolean;
  onSelect: (item: T) => void;
  isItemDisabled?: (item: T) => boolean;
};

export function Dropdown<T>({
  label,
  buttonColor,
  items,
  disabled,
  onSelect,
  labelSelector,
  isItemDisabled,
}: DropdownProps<T>) {
  return (
    <div className="dropdown dropdown-top mr-2">
      <button
        disabled={disabled}
        className={`btn ${buttonColor ? `btn-${buttonColor}` : ''}`}
        tabIndex={0}
      >
        {label}
      </button>
      <ul
        tabIndex={-1}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow"
      >
        {items.map((item, index) => (
          <li>
            <button
              disabled={isItemDisabled ? isItemDisabled(item) : false}
              onClick={() => onSelect(item)}
            >
              {labelSelector(item)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
