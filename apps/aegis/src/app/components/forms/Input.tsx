import { FieldErrorsFeedback } from '@aegis/ui';
import { DetailedHTMLProps, forwardRef } from 'react';
import { FieldErrors } from 'react-hook-form';

interface InputProps extends DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {
  label: string;
  type?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  errors?: FieldErrors;
  fieldName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, type = 'text', placeholder, className = '', disabled, errors, fieldName, ...props },
    ref,
  ) => {
    const hasError = errors && fieldName && errors[fieldName];

    return (
      <div>
        <label className="label">{label}</label>
        <div className="mt-1">
          <input
            ref={ref}
            type={type}
            placeholder={placeholder || label}
            className={`input input-sm w-full ${hasError ? 'input-error' : ''}`}
            disabled={disabled}
            {...props}
          />
        </div>
        {errors && fieldName && <FieldErrorsFeedback errors={errors} fieldName={fieldName} />}
      </div>
    );
  },
);

Input.displayName = 'Input';
