import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FieldDefinitionDetailsModel } from '../model';

const allowedTypeValues = new Set(['STRING', 'NUMBER', 'BOOLEAN', 'DATETIME', 'ENUM']);

function useFieldDefinitionDetailsFormConfig() {
  const { t } = useTranslation();
  const { register, formState, setValue, clearErrors, control, trigger } =
    useFormContext<FieldDefinitionDetailsModel>();

  const keyFormConfig = register('key', {
    maxLength: { value: 100, message: t('fieldDefinitions.keyTooLong') },
    pattern: { value: /^(?!\s*$).+/, message: t('fieldDefinitions.keyCannotBeEmpty') },
    required: t('fieldDefinitions.keyIsRequired'),
  });
  const labelFormConfig = register('label', {
    maxLength: { value: 200, message: t('fieldDefinitions.labelTooLong') },
    pattern: { value: /^(?!\s*$).+/, message: t('fieldDefinitions.labelCannotBeEmpty') },
    required: t('fieldDefinitions.labelIsRequired'),
  });
  const descriptionFormConfig = register('description', {
    maxLength: { value: 500, message: t('fieldDefinitions.descriptionTooLong') },
  });
  const typeFormConfig = register('type', {
    required: t('fieldDefinitions.typeIsRequired'),
    validate: (value, formValues) => {
      if (allowedTypeValues.has(value) === false) {
        return t('fieldDefinitions.invalidType');
      }
      // When type is ENUM, ensure allowedValues has at least one item
      if (value === 'ENUM') {
        const allowedValues = formValues.configuration?.allowedValues || [];
        if (allowedValues.length === 0) {
          return t('fieldDefinitions.enumMustHaveAtLeastOneValue');
        }
      }
      return true;
    },
    onChange: () => {
      setValue('configuration', undefined);
      clearErrors('configuration');
    },
  });

  // string configuration
  const minLengthFormConfig = register('configuration.minLength', {
    min: { value: 0, message: t('fieldDefinitions.stringMinLengthMustBePositive') },
    max: { value: Number.MAX_SAFE_INTEGER, message: t('fieldDefinitions.stringMinLengthTooLarge') },
    validate: (value, formValues) => {
      const maxLength = formValues.configuration.maxLength;
      return (
        isNaN(value) ||
        isNaN(maxLength) ||
        value <= maxLength ||
        t('fieldDefinitions.stringMinLengthMustBeLessThanMaxLength')
      );
    },
    onBlur: () => trigger('configuration.maxLength'),
    shouldUnregister: true,
    valueAsNumber: true,
  });

  const maxLengthFormConfig = register('configuration.maxLength', {
    min: { value: 0, message: t('fieldDefinitions.stringMaxLengthMustBePositive') },
    max: { value: Number.MAX_SAFE_INTEGER, message: t('fieldDefinitions.stringMaxLengthTooLarge') },
    validate: (value, formValues) => {
      const minLength = formValues.configuration.minLength;
      return (
        isNaN(value) ||
        isNaN(minLength) ||
        value >= minLength ||
        t('fieldDefinitions.stringMaxLengthMustBeGreaterThanMinLength')
      );
    },
    onBlur: () => trigger('configuration.minLength'),
    shouldUnregister: true,
    valueAsNumber: true,
  });

  const regexPatternFormConfig = register('configuration.regexPattern', {
    validate: (value) => {
      if (value) {
        try {
          new RegExp(value);
          return true;
        } catch (e) {
          return t('fieldDefinitions.invalidRegexPattern');
        }
      }
      return true;
    },
    shouldUnregister: true,
  });

  // number configuration
  const minFormConfig = register('configuration.min', {
    min: {
      value: Number.MIN_SAFE_INTEGER,
      message: t('fieldDefinitions.numberMinMustBeWithinRange'),
    },
    max: {
      value: Number.MAX_SAFE_INTEGER,
      message: t('fieldDefinitions.numberMaxMustBeWithinRange'),
    },
    validate: (value, formValues) => {
      const max = formValues.configuration.max;
      return (
        isNaN(value) ||
        isNaN(max) ||
        value <= max ||
        t('fieldDefinitions.numberMinMustBeLessThanMax')
      );
    },
    onBlur: () => trigger('configuration.max'),
    shouldUnregister: true,
    valueAsNumber: true,
  });

  const maxFormConfig = register('configuration.max', {
    min: {
      value: Number.MIN_SAFE_INTEGER,
      message: t('fieldDefinitions.numberMinMustBeWithinRange'),
    },
    max: {
      value: Number.MAX_SAFE_INTEGER,
      message: t('fieldDefinitions.numberMaxMustBeWithinRange'),
    },
    validate: (value, formValues) => {
      const min = formValues.configuration.min;
      return (
        isNaN(value) ||
        isNaN(min) ||
        value >= min ||
        t('fieldDefinitions.numberMaxMustBeGreaterThanMin')
      );
    },
    onBlur: () => trigger('configuration.min'),
    shouldUnregister: true,
  });

  const decimalPlacesFormConfig = register('configuration.decimalPlaces', {
    min: { value: 0, message: t('fieldDefinitions.decimalPlacesMustBeNonNegative') },
    max: { value: 20, message: t('fieldDefinitions.decimalPlacesTooLarge') },
    shouldUnregister: true,
    valueAsNumber: true,
  });

  const allowedValueFormConfig = (index: number) =>
    register(`configuration.allowedValues.${index}`, {
      required: t('fieldDefinitions.allowedValueRequired'),
      // not allow empty strings
      pattern: { value: /^(?!\s*$).+/, message: t('fieldDefinitions.allowedValueCannotBeEmpty') },
      validate: (value, formValues) => {
        // Check for uniqueness within allowedValues array
        const type = formValues.type;
        if (type === 'ENUM' && value) {
          const allowedValues = formValues.configuration.allowedValues || [];
          const duplicateCount = allowedValues.filter(
            (v: string) => v && v.trim() === value.trim(),
          ).length;
          if (duplicateCount > 1) {
            return t('fieldDefinitions.allowedValuesMustBeUnique');
          }
        }
        return true;
      },
      onChange: () => trigger('type'),
      shouldUnregister: true,
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'configuration.allowedValues',
  });

  const appendAllowedValue = (value: string) => {
    append(value, { shouldFocus: true, focusName: `configuration.allowedValues.${fields.length}` });
    trigger('type');
  };

  const removeAllowedValue = (index: number) => {
    remove(index);
    trigger('type');
  };

  return {
    keyFormConfig: { registerConfig: keyFormConfig },
    labelFormConfig: { registerConfig: labelFormConfig },
    descriptionFormConfig: { registerConfig: descriptionFormConfig },
    typeFormConfig: { registerConfig: typeFormConfig },
    configuration: {
      minLengthFormConfig: { registerConfig: minLengthFormConfig },
      maxLengthFormConfig: { registerConfig: maxLengthFormConfig },
      regexPatternFormConfig: { registerConfig: regexPatternFormConfig },
      minFormConfig: { registerConfig: minFormConfig },
      maxFormConfig: { registerConfig: maxFormConfig },
      decimalPlacesFormConfig: { registerConfig: decimalPlacesFormConfig },
      allowedValues: {
        append: appendAllowedValue,
        remove: removeAllowedValue,
        fields,
        allowedValueFormConfig: { registerConfig: allowedValueFormConfig },
      },
    },
    formState,
    setValue,
  };
}

export default useFieldDefinitionDetailsFormConfig;
