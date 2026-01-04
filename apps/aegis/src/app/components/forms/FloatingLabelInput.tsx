import { forwardRef, ReactNode } from 'react';
import { FieldErrorsFeedback } from '@aegis/ui';
import { FieldErrors } from 'react-hook-form';

interface FloatingLabelInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  errors?: FieldErrors;
  fieldName?: string;
  children?: ReactNode;
}

export const FloatingLabelInput = forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  (
    {
      label,
      type = 'text',
      placeholder,
      className = '',
      disabled,
      errors,
      fieldName,
      children,
      ...props
    },
    ref
  ) => {
    const hasError = errors && fieldName && errors[fieldName];

    if (children) {
      // For select/textarea elements passed as children
      return (
        <div className={`form-control w-full ${className}`}>
          <label className="label">
            <span className="label-text">{label}</span>
          </label>
          {children}
          {errors && fieldName && <FieldErrorsFeedback errors={errors} fieldName={fieldName} />}
        </div>
      );
    }

    return (
      <div className={`form-control w-full ${className}`}>
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <input
          ref={ref}
          type={type}
          placeholder={placeholder || label}
          className={`input input-bordered w-full ${hasError ? 'input-error' : ''}`}
          disabled={disabled}
          {...props}
        />
        {errors && fieldName && <FieldErrorsFeedback errors={errors} fieldName={fieldName} />}
      </div>
    );
  }
);

FloatingLabelInput.displayName = 'FloatingLabelInput';
