import { FieldErrors } from 'react-hook-form';

type FieldErrorProps = {
  errors: FieldErrors;
  fieldName: string;
};

export function FieldErrorsFeedback({ errors, fieldName }: FieldErrorProps) {
  const fieldErrors = Object.entries(errors)
    .filter(([key, value]) => fieldName === key && value)
    .map(([key, value]) => ({ key, value }));

  if (fieldErrors.length === 0) {
    return null;
  }

  return (
    <div className="text-error text-sm mt-1">
      {fieldErrors.map((fieldError, fieldErrorIndex) => {
        return (
          <div key={fieldError.key + fieldErrorIndex}>
            {fieldError.value?.message && <div>{`${fieldError.value.message}`}</div>}
            {Object.values(fieldError.value?.types || {}).map((errorMessage, idx) => (
              <div key={idx}>{errorMessage}</div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
