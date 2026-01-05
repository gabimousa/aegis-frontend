import { ReactNode } from 'react';

type DropdownProps<T> = {
  label: ReactNode;
  buttonColor?: 'primary' | 'secondary' | 'accent' | 'ghost';
  buttonSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  items: Array<T> | ReadonlyArray<T>;
  labelSelector: (item: T) => string;
  disabled?: boolean;
  onSelect: (item: T) => void;
  isItemDisabled?: (item: T) => boolean;
  position?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
};

export function Dropdown<T>({
  label,
  buttonColor,
  buttonSize = 'md',
  items,
  disabled,
  onSelect,
  labelSelector,
  isItemDisabled,
  position = 'bottom',
  align = 'start',
}: DropdownProps<T>) {
  const handleItemClick = (item: T) => {
    onSelect(item);
    // Remove focus to close dropdown
    (document.activeElement as HTMLElement)?.blur();
  };

  const getDropdownClasses = () => {
    let classes = 'dropdown';

    // Add position classes
    switch (position) {
      case 'top':
        classes += ' dropdown-top';
        break;
      case 'bottom':
        classes += ' dropdown-bottom';
        break;
      case 'left':
        classes += ' dropdown-left';
        break;
      case 'right':
        classes += ' dropdown-right';
        break;
    }

    // Add alignment classes
    switch (align) {
      case 'start':
        classes += ' dropdown-start';
        break;
      case 'center':
        classes += ' dropdown-center';
        break;
      case 'end':
        classes += ' dropdown-end';
        break;
    }

    return classes;
  };

  const getDropdownContentClasses = () => {
    let classes = 'dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow';

    // Add spacing based on position
    switch (position) {
      case 'top':
        classes += ' mb-1';
        break;
      case 'bottom':
        classes += ' mt-1';
        break;
      case 'left':
        classes += ' mr-1';
        break;
      case 'right':
        classes += ' ml-1';
        break;
    }

    return classes;
  };

  return (
    <div className={getDropdownClasses()}>
      <div
        tabIndex={0}
        role="button"
        className={`btn ${buttonColor ? `btn-${buttonColor}` : ''} ${`btn-${buttonSize}`} ${disabled ? 'btn-disabled' : ''}`}
      >
        {label}
      </div>
      <ul tabIndex={-1} className={getDropdownContentClasses()}>
        {items.map((item, index) => (
          <li key={index}>
            <button
              disabled={isItemDisabled ? isItemDisabled(item) : false}
              onClick={() => handleItemClick(item)}
            >
              {labelSelector(item)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
