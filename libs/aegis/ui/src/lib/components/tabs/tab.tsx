import { PropsWithChildren, ReactNode } from 'react';

type TabProps = PropsWithChildren<{
  label: ReactNode;
  active: boolean;
  disabled?: boolean;
  onSelect?: () => void;
}>;

export function Tab({ label, active: isActive, onSelect, disabled, children }: TabProps) {
  return (
    <>
      <span
        onClick={() => {
          if (!disabled && onSelect) {
            onSelect();
          }
        }}
        role="tab"
        className={`tab ${isActive ? 'tab-active text-primary' : ''} ${disabled ? 'tab-disabled' : ''}`}
        aria-label={typeof label === 'string' ? label : undefined}
        aria-selected={isActive}
        aria-disabled={disabled}
      >
        <span className={`text-base-content`}>{label}</span>
      </span>
      <div role="tabpanel" className="tab-content bg-base-100 border-base-300 p-6">
        {children}
      </div>
    </>
  );
}
