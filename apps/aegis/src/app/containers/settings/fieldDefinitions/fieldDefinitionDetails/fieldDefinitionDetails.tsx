import {
  CreateFieldDefinitionInput,
  CustomFieldType,
  setFieldErrors,
  UpdateFieldDefinitionInput,
} from '@aegis/shared';
import { Tabs } from '@aegis/ui';
import { useEffect, useId } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMatch, useNavigate } from 'react-router';
import { DetailsPanel } from '../../../../components';
import { useFieldDefinitionDetailsQuery, useSaveFieldDefinition } from '../data';
import { FieldDefinitionDetailsModel } from '../model';
import { FieldDefinitionForm } from './fieldDefinitionForm';

const serverErrorMap: Record<string, string> = {
  Key: 'key',
  Label: 'label',
  Type: 'type',
};

export function FieldDefinitionDetails() {
  const detailsFormId = useId();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const match = useMatch('settings/field-definitions/:id');

  const isNew = match?.params.id === 'NEW';
  console.log('isNew', isNew);
  const {
    data: fieldDefinition,
    isError,
    isLoading,
    error,
  } = useFieldDefinitionDetailsQuery({
    id: isNew ? undefined : match?.params.id,
  });

  const {
    mutate: saveFieldDefinition,
    isPending: savingFieldDefinitionDetails,
    isSuccess: saveFieldDefinitionSuccess,
    error: saveFieldDefinitionError,
  } = useSaveFieldDefinition();

  const formProps = useForm<FieldDefinitionDetailsModel>({
    mode: 'all',
    defaultValues: {
      key: '',
      label: '',
      type: 'STRING',
    },
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = formProps;

  useEffect(() => {
    reset(fieldDefinition);
  }, [fieldDefinition, reset]);

  useEffect(() => {
    if (saveFieldDefinitionSuccess) {
      navigate('..');
    }
  }, [saveFieldDefinitionSuccess, navigate]);

  useEffect(() => {
    if (saveFieldDefinitionError) {
      setFieldErrors(saveFieldDefinitionError, setError, serverErrorMap);
    }
  }, [saveFieldDefinitionError, setError]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const extractConfiguration = (type: CustomFieldType, configuration: any) => {
    if (!configuration) return configuration;
    switch (type) {
      case 'STRING':
        return {
          minLength: isNaN(configuration.minLength) ? undefined : configuration.minLength,
          maxLength: isNaN(configuration.maxLength) ? undefined : configuration.maxLength,
          regexPattern: configuration.regexPattern || undefined,
        };
      case 'NUMBER':
        return {
          min: isNaN(configuration.min) ? undefined : configuration.min,
          max: isNaN(configuration.max) ? undefined : configuration.max,
          decimalPlaces: isNaN(configuration.decimalPlaces)
            ? undefined
            : configuration.decimalPlaces,
        };
      case 'ENUM':
        return {
          allowedValues: configuration.allowedValues,
        };
      default:
        return undefined;
    }
  };

  const onSubmit = (formState: FieldDefinitionDetailsModel) => {
    if (fieldDefinition) {
      const input: UpdateFieldDefinitionInput = {
        id: fieldDefinition.id,
        key: formState.key,
        label: formState.label,
        configuration: extractConfiguration(formState.type, formState.configuration),
      };
      saveFieldDefinition(input);
    } else {
      const input: CreateFieldDefinitionInput = {
        key: formState.key,
        label: formState.label,
        type: formState.type,
        configuration: extractConfiguration(formState.type, formState.configuration),
      };
      console.log(input.configuration);
      saveFieldDefinition(input);
    }
  };

  const actions = (
    <>
      <button className="btn btn-secondary" onClick={() => navigate('..')}>
        {t('common.cancel')}
      </button>
      <button
        className="btn btn-primary"
        form={detailsFormId}
        type="submit"
        disabled={savingFieldDefinitionDetails || !isValid || !isDirty}
      >
        {savingFieldDefinitionDetails ? <span className="loading loading-spinner mr-2" /> : null}
        {t('common.save')}
      </button>
    </>
  );

  return (
    <DetailsPanel
      title={fieldDefinition ? fieldDefinition.label : t('fieldDefinitions.newFieldDefinition')}
      loading={isLoading || savingFieldDefinitionDetails}
      actions={actions}
      onClose={() => navigate('..')}
    >
      {errors.root &&
        (errors.root.types ? (
          Object.values(errors.root.types)
            .flatMap((v) => v)
            .map((error, idx) => (
              <div key={'root-error-' + idx} className="alert alert-error">
                {error}
              </div>
            ))
        ) : (
          <div className="alert alert-error">{errors.root?.message}</div>
        ))}

      <FormProvider {...formProps}>
        <form id={detailsFormId} noValidate onSubmit={handleSubmit(onSubmit)}>
          <Tabs>
            <Tabs.Tab label={t('common.details')} active={true}>
              {isError ? (
                <p>Error: {error.message}</p>
              ) : (
                <FieldDefinitionForm mode={isNew ? 'create' : 'edit'} />
              )}
            </Tabs.Tab>
          </Tabs>
        </form>
      </FormProvider>
    </DetailsPanel>
  );
}
