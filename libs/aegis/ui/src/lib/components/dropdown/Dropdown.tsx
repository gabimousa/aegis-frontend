import { ReactNode } from 'react';

type DropdownProps<T> = {
  label: ReactNode;
  variant?:
    | 'neutral'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
  btnStyle?: 'outline' | 'dash' | 'soft' | 'ghost' | 'link';
  buttonSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  items: Array<T | 'SEPARATOR'> | ReadonlyArray<T | 'SEPARATOR'>;
  labelSelector: (item: T) => string | ReactNode;
  disabled?: boolean;
  onSelect?: (item: T) => void;
  isItemDisabled?: (item: T) => boolean;
  position?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
};

export function Dropdown<T = 'SEPARATOR'>({
  label,
  variant,
  btnStyle,
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
    onSelect?.(item);
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

  const getButtonClasses = () => {
    let classes = 'btn ';
    if (btnStyle) {
      classes += `btn-${btnStyle} `;
    }

    if (variant) {
      classes += `btn-${variant} `;
    }

    return classes;
  };

  return (
    <div className={getDropdownClasses()}>
      <div
        tabIndex={0}
        role="button"
        className={`${getButtonClasses()} ${`btn-${buttonSize}`} ${disabled ? 'btn-disabled' : ''}`}
      >
        {label}
      </div>
      <ul tabIndex={-1} className={`${getDropdownContentClasses()}`}>
        {items.map((item, index) => (
          <li key={index}>
            {item === 'SEPARATOR' ? (
              <button disabled={true} className="btn h-0"></button>
            ) : (
              <button
                className={`${isItemDisabled && isItemDisabled(item) ? 'bg-base-100 cursor-not-allowed text-gray-300' : 'text-base-content'}`}
                disabled={isItemDisabled ? isItemDisabled(item) : false}
                onClick={() => handleItemClick(item)}
              >
                {labelSelector(item)}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
