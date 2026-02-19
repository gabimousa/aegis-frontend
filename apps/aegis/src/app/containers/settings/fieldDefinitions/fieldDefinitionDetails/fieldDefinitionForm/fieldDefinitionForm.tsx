import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Plus, Trash } from 'tabler-icons-react';
import { Input, Select, TextArea } from '../../../../../components/forms';
import useFieldDefinitionDetailsFormConfig from '../useFieldDefinitionDetailsFormConfig';

type FieldDefinitionFormProps = {
  mode: 'edit' | 'create';
};

export function FieldDefinitionForm({ mode }: FieldDefinitionFormProps) {
  const { t } = useTranslation();
  const {
    keyFormConfig,
    labelFormConfig,
    descriptionFormConfig,
    typeFormConfig,
    configuration: {
      minLengthFormConfig,
      maxLengthFormConfig,
      regexPatternFormConfig,
      minFormConfig,
      maxFormConfig,
      decimalPlacesFormConfig,
      allowedValues: { allowedValueFormConfig, append, remove, fields },
    },
    formState,
  } = useFieldDefinitionDetailsFormConfig();

  const { errors } = formState;

  const selectedType = useWatch({ name: 'type' });

  return (
    <fieldset className="fieldset border-base-100 rounded-box w-full">
      <Input
        label={t('fieldDefinitions.key')}
        type="text"
        placeholder={t('fieldDefinitions.enterFieldDefinitionKey')}
        errors={errors}
        fieldName="key"
        {...keyFormConfig.registerConfig}
      />
      <Input
        label={t('fieldDefinitions.label')}
        type="text"
        placeholder={t('fieldDefinitions.enterFieldDefinitionLabel')}
        errors={errors}
        fieldName="label"
        {...labelFormConfig.registerConfig}
      />
      <TextArea
        label={t('fieldDefinitions.description')}
        placeholder={t('fieldDefinitions.enterFieldDefinitionDescription')}
        errors={errors}
        fieldName="description"
        {...descriptionFormConfig.registerConfig}
      />
      <Select
        label={t('fieldDefinitions.type')}
        errors={errors}
        fieldName="type"
        {...typeFormConfig.registerConfig}
        options={[
          { value: 'STRING', label: t('fieldDefinitions.string') },
          { value: 'NUMBER', label: t('fieldDefinitions.number') },
          { value: 'BOOLEAN', label: t('fieldDefinitions.boolean') },
          { value: 'DATETIME', label: t('fieldDefinitions.datetime') },
          { value: 'ENUM', label: t('fieldDefinitions.enum') },
        ]}
        valueKey="value"
        labelKey="label"
        disabled={mode === 'edit'}
      />
      {selectedType === 'STRING' && (
        <>
          <Input
            label={t('fieldDefinitions.minLength')}
            type="number"
            errors={errors}
            fieldName="configuration.minLength"
            {...minLengthFormConfig.registerConfig}
          />
          <Input
            label={t('fieldDefinitions.maxLength')}
            type="number"
            errors={errors}
            fieldName="configuration.maxLength"
            {...maxLengthFormConfig.registerConfig}
          />
          <Input
            label={t('fieldDefinitions.stringRegexPattern')}
            type="text"
            errors={errors}
            fieldName="configuration.regexPattern"
            {...regexPatternFormConfig.registerConfig}
          />
        </>
      )}

      {selectedType === 'NUMBER' && (
        <>
          <Input
            label={t('fieldDefinitions.min')}
            type="number"
            errors={errors}
            fieldName="configuration.min"
            {...minFormConfig.registerConfig}
          />
          <Input
            label={t('fieldDefinitions.max')}
            type="number"
            errors={errors}
            fieldName="configuration.max"
            {...maxFormConfig.registerConfig}
          />
          <Input
            label={t('fieldDefinitions.decimalPlaces')}
            type="number"
            errors={errors}
            fieldName="configuration.decimalPlaces"
            {...decimalPlacesFormConfig.registerConfig}
          />
        </>
      )}
      {selectedType === 'ENUM' && (
        <div>
          <label className="label">{t('fieldDefinitions.allowedValues')}</label>
          <div className="flex flex-col gap-2">
            {fields.map((_, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="flex-1">
                  <Input
                    key={index}
                    type="text"
                    placeholder={t('fieldDefinitions.enterAllowedValue')}
                    errors={errors}
                    fieldName={`configuration.allowedValues.${index}`}
                    {...allowedValueFormConfig.registerConfig(index)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-error mt-1"
                  onClick={() => remove(index)}
                >
                  <Trash size={16}></Trash>
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-sm btn-primary" onClick={() => append('')}>
              <Plus size={16}></Plus> {t('common.add')}
            </button>
          </div>
        </div>
      )}
    </fieldset>
  );
}
