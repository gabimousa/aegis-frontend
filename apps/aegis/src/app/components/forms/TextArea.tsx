import { FieldErrorsFeedback } from '@aegis/ui';
import { DetailedHTMLProps, forwardRef, TextareaHTMLAttributes } from 'react';
import { FieldErrors } from 'react-hook-form';

interface TextAreaProps extends DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> {
  label: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  errors?: FieldErrors;
  fieldName?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, placeholder, className = '', disabled, errors, fieldName, ...props }, ref) => {
    const hasError = errors && fieldName && errors[fieldName];

    return (
      <div>
        <label className="label">{label}</label>
        <div className="mt-1">
          <textarea
            ref={ref}
            placeholder={placeholder || label}
            className={`textarea textarea-sm w-full ${hasError ? 'textarea-error' : ''}`}
            disabled={disabled}
            {...props}
          />
        </div>
        {errors && fieldName && <FieldErrorsFeedback errors={errors} fieldName={fieldName} />}
      </div>
    );
  },
);

TextArea.displayName = 'TextArea';
