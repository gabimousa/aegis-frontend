import { getNestedProperty, NestedPath } from '@aegis/utils';
import { FieldErrors } from 'react-hook-form';

type FieldErrorProps = {
  errors: FieldErrors;
  errorField: NestedPath<FieldErrors>;
};

export function FieldErrorsFeedback({ errors, errorField }: FieldErrorProps) {
  const fieldError = getNestedProperty(errors, errorField);

  return (
    fieldError && (
      <div className="text-error mt-1 text-sm">
        {fieldError.message && <div>{`${fieldError.message}`}</div>}
        {Object.values(fieldError.types || {}).map((errorMessage, idx) => (
          <div key={idx}>{errorMessage}</div>
        ))}
      </div>
    )
  );
}
