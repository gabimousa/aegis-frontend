import {
  Alpha3Code,
  CreateAddressInput,
  RegisterSupplierInput,
  setFieldErrors,
  UpdateAddressInput,
  UpdateSupplierDetailsInput,
} from '@aegis/shared';
import { useEffect, useId, useState } from 'react';

import { Dropdown, Tabs } from '@aegis/ui';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMatch, useNavigate } from 'react-router';
import { User } from 'tabler-icons-react';
import { DetailsPanel } from '../../../components';
import { useSaveSupplier, useSupplierDetailsQuery } from '../data';
import { AddressModel, SupplierDetailsModel } from '../model';
import { AddressForm } from './addressForm';
import { SupplierForm } from './supplierForm';

const serverErrorMap: Record<string, string> = {
  Code: 'code',
  Name: 'name',
  Website: 'website',
  Email: 'email',
  PhoneNumber: 'phoneNumber',
  IBAN: 'iban',
  BIC: 'bic',
};

const addressTypes = ['VISITING', 'MAILING', 'DELIVERY'] as const;

export function SupplierDetails() {
  const [activeTab, setActiveTab] = useState('details');
  const detailsFormId = useId();
  const navigate = useNavigate();
  const match = useMatch('/suppliers/:id');
  const { t } = useTranslation();
  const {
    data: supplier,
    isError,
    isLoading,
    error,
  } = useSupplierDetailsQuery({ id: match?.params.id === 'NEW' ? undefined : match?.params.id });
  const {
    mutate: saveSupplierDetails,
    isPending: savingSupplierDetails,
    isSuccess: saveSupplierSuccess,
    error: saveSupplierErrorData,
  } = useSaveSupplier();

  const formProps = useForm<SupplierDetailsModel>({
    mode: 'all',
    defaultValues: {
      code: '',
      name: '',
      website: '',
      email: '',
      phoneNumber: '',
      iban: '',
      bic: '',
      addresses: [],
    },
  });

  const {
    reset,
    setError,
    control,
    handleSubmit,
    formState: { isValid, isDirty, errors },
  } = formProps;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'addresses',
  });

  useEffect(() => {
    if (saveSupplierErrorData) {
      setFieldErrors(saveSupplierErrorData, setError, serverErrorMap);
    }
  }, [saveSupplierErrorData, setError]);

  useEffect(() => {
    reset(supplier);
  }, [supplier, reset]);

  useEffect(() => {
    if (saveSupplierSuccess) {
      navigate('..');
    }
  }, [saveSupplierSuccess, navigate]);

  const canAppendAddressTypes = (addressType: 'VISITING' | 'MAILING' | 'DELIVERY') => {
    return !fields.some((address) => address.type === addressType);
  };
  const canAppendVisitingAddress = canAppendAddressTypes('VISITING');
  const canAppendMailingAddress = canAppendAddressTypes('MAILING');
  const canAppendDeliveryAddress = canAppendAddressTypes('DELIVERY');
  const canAppendAddress =
    canAppendVisitingAddress || canAppendMailingAddress || canAppendDeliveryAddress;

  const appendAddress = (addressType: 'VISITING' | 'MAILING' | 'DELIVERY') => {
    append({
      id: '',
      street: '',
      number: '',
      zipCode: '',
      city: '',
      state: '',
      countryCode: Alpha3Code.Nld,
      type: addressType,
    });
  };

  const getSupplierInputWithAddresses = (
    formState: SupplierDetailsModel,
    supplierInput: RegisterSupplierInput | UpdateSupplierDetailsInput,
  ): RegisterSupplierInput | UpdateSupplierDetailsInput => {
    const getAddressBase = (address: AddressModel): Partial<CreateAddressInput> => {
      return {
        street: address.street,
        number: address.number,
        zipCode: address.zipCode,
        city: address.city,
        state: address.state,
        countryCode: address.countryCode,
      };
    };

    const getCreateAddressInput = (address: AddressModel): CreateAddressInput => {
      return { ...getAddressBase(address), type: address.type };
    };

    const getUpdateAddressInput = (address: AddressModel): UpdateAddressInput => {
      return { id: address.id, ...getAddressBase(address) };
    };

    if ('id' in supplierInput) {
      const addedAddresses = formState.addresses
        .filter((address) => !address.id)
        .map((address) => getCreateAddressInput(address));
      const updatedAddresses = formState.addresses
        .filter((address) => address.id)
        .map((address) => getUpdateAddressInput(address));
      const removedAddresses =
        supplier?.addresses
          ?.filter((address) => !formState.addresses.some((a) => a.id === address.id))
          .map((address) => ({ id: address.id })) || [];
      return {
        ...supplierInput,
        addedAddresses,
        updatedAddresses,
        removedAddresses,
      };
    } else {
      return {
        ...supplierInput,
        addresses: fields.map((address) => getCreateAddressInput(address)),
      };
    }
  };

  const onSubmit = (formState: SupplierDetailsModel) => {
    const idInput = formState?.id ? { id: formState.id } : {};

    const supplierInput = {
      ...idInput,
      code: formState.code,
      name: formState.name,
      website: formState.website,
      email: formState.email,
      phoneNumber: formState.phoneNumber,
      iban: formState.iban,
      bic: formState.bic,
    } as RegisterSupplierInput | UpdateSupplierDetailsInput;

    saveSupplierDetails(getSupplierInputWithAddresses(formState, supplierInput));
  };

  const actions = (
    <>
      {activeTab === 'addresses' && (
        <Dropdown
          items={addressTypes}
          label={t('addresses.addAddress')}
          position="top"
          align="start"
          disabled={!canAppendAddress}
          labelSelector={(item) => {
            switch (item) {
              case 'VISITING':
                return t('addresses.visiting');
              case 'MAILING':
                return t('addresses.mailing');
              case 'DELIVERY':
                return t('addresses.delivery');
            }
          }}
          onSelect={(item) => appendAddress(item)}
          isItemDisabled={(item) => !canAppendAddressTypes(item)}
        />
      )}
      <button className="btn btn-secondary" onClick={() => navigate('..')}>
        {t('common.cancel')}
      </button>
      <button
        className="btn btn-primary"
        form={detailsFormId}
        type="submit"
        disabled={savingSupplierDetails || !isValid || !isDirty}
      >
        {savingSupplierDetails ? <span className="loading loading-spinner mr-2" /> : null}
        {t('common.save')}
      </button>
    </>
  );

  return (
    <DetailsPanel
      title={
        <>
          <User size={24} className="mr-2" /> {supplier?.name || t('New Supplier')}
        </>
      }
      onClose={() => navigate('..')}
      actions={actions}
      loading={isLoading || savingSupplierDetails}
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
            <Tabs.Tab
              label={t('common.details')}
              active={activeTab === 'details'}
              onSelect={() => setActiveTab('details')}
            >
              {isError ? <p>Error: {error.message}</p> : <SupplierForm />}
            </Tabs.Tab>
            <Tabs.Tab
              label={t('common.addresses')}
              active={activeTab === 'addresses'}
              onSelect={() => setActiveTab('addresses')}
            >
              {fields.length ? (
                fields.map((address, index) => (
                  <div className="mt-2" key={fields[index].id}>
                    <AddressForm
                      index={index}
                      address={address}
                      onRemove={() => remove(index)}
                    ></AddressForm>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">{t('addresses.noAddresses')}</p>
              )}
            </Tabs.Tab>
          </Tabs>
        </form>
      </FormProvider>
    </DetailsPanel>
  );
}
