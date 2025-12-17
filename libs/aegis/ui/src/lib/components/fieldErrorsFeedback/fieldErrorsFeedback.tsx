import { Form } from 'react-bootstrap';
import { FieldErrors } from 'react-hook-form';

type FieldErrorProps = {
  errors: FieldErrors;
  fieldName: string;
};

export function FieldErrorsFeedback({ errors, fieldName }: FieldErrorProps) {
  const fieldErrors = Object.entries(errors)
    .filter(([key, value]) => fieldName === key && value)
    .map(([key, value]) => ({ key, value }));

  return (
    <Form.Control.Feedback type="invalid">
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
    </Form.Control.Feedback>
  );
}
