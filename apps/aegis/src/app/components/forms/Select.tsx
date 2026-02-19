import { FieldErrorsFeedback } from '@aegis/ui';
import { DetailedHTMLProps, forwardRef, ReactElement, Ref, SelectHTMLAttributes } from 'react';
import { FieldErrors } from 'react-hook-form';

interface SelectProps<T> extends DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> {
  label: string;
  className?: string;
  disabled?: boolean;
  errors?: FieldErrors;
  fieldName?: string;
  options: Array<T>;
  valueKey: keyof T;
  labelKey: keyof T;
}

function SelectInner<T>(
  {
    label,
    className = '',
    disabled,
    errors,
    fieldName,
    options,
    valueKey,
    labelKey,
    ...rest
  }: SelectProps<T>,
  ref: Ref<HTMLSelectElement>,
) {
  const hasError = errors && fieldName && errors[fieldName];

  return (
    <div>
      <label className="label">{label}</label>

      <div className="mt-1">
        <select
          ref={ref}
          className={`select select-sm w-full ${className} ${hasError ? 'select-error' : ''}`}
          disabled={disabled}
          {...rest}
        >
          {options.map((option, i) => (
            <option key={i} value={String(option[valueKey])}>
              {String(option[labelKey])}
            </option>
          ))}
        </select>
      </div>

      {errors && fieldName && <FieldErrorsFeedback errors={errors} errorField={fieldName} />}
    </div>
  );
}

// Attach displayName here 👇 (still valid React component type)
const SelectForwardRef = forwardRef(SelectInner);
SelectForwardRef.displayName = 'Select';

// Now cast to generic signature 👇
export const Select = SelectForwardRef as unknown as <T>(
  props: SelectProps<T> & { ref?: Ref<HTMLSelectElement> },
) => ReactElement;
