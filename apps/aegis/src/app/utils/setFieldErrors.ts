import { FieldValues, Path, UseFormSetError } from 'react-hook-form';

function setFieldErrors<TFieldValues extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<TFieldValues>,
  errorMap?: Record<string, string>
) {
  if (error && typeof error === 'object') {
    if ('message' in error && typeof error.message === 'string') {
      setError('root', { message: error.message });
    } else {
      Object.entries(error).forEach(([fieldName, fieldErrors]) => {
        if (Array.isArray(fieldErrors)) {
          const types = fieldErrors.reduce((acc, curr) => {
            acc[curr.code] = curr.description;
            return acc;
          }, {} as Record<string, string>);
          const mappedFieldName = errorMap?.[fieldName] ?? fieldName;
          setError((mappedFieldName as Path<TFieldValues>) ?? 'root', { types });
        }
      });
    }
  }
}

export default setFieldErrors;
