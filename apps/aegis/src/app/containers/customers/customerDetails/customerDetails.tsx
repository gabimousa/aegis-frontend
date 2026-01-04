import {
  Alpha3Code,
  CreateAddressInput,
  RegisterCustomerInput,
  setFieldErrors,
  UpdateAddressInput,
  UpdateCustomerDetailsInput,
} from '@aegis/shared';
import { useEffect, useId, useState } from 'react';

import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMatch, useNavigate } from 'react-router';
import { User } from 'tabler-icons-react';
import { DetailsPanel } from '../../../components';
import { useCustomerDetailsQuery, useSaveCustomer } from '../data';
import { AddressModel, CustomerDetailsModel } from '../model';
import { AddressForm } from './addressForm';
import { CustomerForm } from './customerForm';

const serverErrorMap: Record<string, string> = {
  Code: 'code',
  Name: 'name',
  Website: 'website',
  Email: 'email',
  PhoneNumber: 'phoneNumber',
  IBAN: 'iban',
  BIC: 'bic',
};

export function CustomerDetails() {
  const [activeTab, setActiveTab] = useState('details');
  const detailsFormId = useId();
  const navigate = useNavigate();
  const match = useMatch('/customers/:id');
  const { t } = useTranslation();
  const {
    data: customer,
    isError,
    isLoading,
    error,
  } = useCustomerDetailsQuery({ id: match?.params.id === 'NEW' ? undefined : match?.params.id });

  const {
    mutate: saveCustomerDetails,
    isPending: savingCustomerDetails,
    isSuccess: saveCustomerSuccess,
  } = useSaveCustomer();

  const formProps = useForm<CustomerDetailsModel>({
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
    reset(customer);
  }, [customer, reset]);

  useEffect(() => {
    if (saveCustomerSuccess) {
      navigate('..');
    }
  }, [saveCustomerSuccess, navigate]);

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

  const getCustomerInputWithAddresses = (
    formState: CustomerDetailsModel,
    customerInput: RegisterCustomerInput | UpdateCustomerDetailsInput
  ): RegisterCustomerInput | UpdateCustomerDetailsInput => {
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

    if ('id' in customerInput) {
      const addedAddresses = formState.addresses
        .filter((address) => !address.id)
        .map((address) => getCreateAddressInput(address));
      const updatedAddresses = formState.addresses
        .filter((address) => address.id)
        .map((address) => getUpdateAddressInput(address));
      const removedAddresses =
        customer?.addresses
          ?.filter((address) => !formState.addresses.some((a) => a.id === address.id))
          .map((address) => ({ id: address.id })) || [];
      return {
        ...customerInput,
        addedAddresses,
        updatedAddresses,
        removedAddresses,
      };
    } else {
      return {
        ...customerInput,
        addresses: fields.map((address) => getCreateAddressInput(address)),
      };
    }
  };

  const onSubmit = (formState: CustomerDetailsModel) => {
    const idInput = formState?.id ? { id: formState.id } : {};
    try {
      const customerInput = {
        ...idInput,
        code: formState.code,
        name: formState.name,
        website: formState.website,
        email: formState.email,
        phoneNumber: formState.phoneNumber,
        iban: formState.iban,
        bic: formState.bic,
      } as RegisterCustomerInput | UpdateCustomerDetailsInput;

      saveCustomerDetails(getCustomerInputWithAddresses(formState, customerInput));
    } catch (error) {
      setFieldErrors(error, setError, serverErrorMap);
    }
  };

  const actions = (
    <>
      {activeTab === 'addresses' && (
        <div className="dropdown dropdown-top mr-2">
          <button disabled={!canAppendAddress} className="btn btn-secondary" tabIndex={0}>
            {t('addresses.addAddress')}
          </button>
          <ul
            tabIndex={-1}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <button
                disabled={!canAppendAddressTypes('VISITING')}
                onClick={() => appendAddress('VISITING')}
              >
                {t('addresses.visiting')}
              </button>
            </li>
            <li>
              <button
                disabled={!canAppendAddressTypes('MAILING')}
                onClick={() => appendAddress('MAILING')}
              >
                {t('addresses.mailing')}
              </button>
            </li>
            <li>
              <button
                disabled={!canAppendAddressTypes('DELIVERY')}
                onClick={() => appendAddress('DELIVERY')}
              >
                {t('addresses.delivery')}
              </button>
            </li>
          </ul>
        </div>
      )}
      <button className="btn btn-secondary" onClick={() => navigate('..')}>
        {t('common.cancel')}
      </button>
      <button
        className="btn btn-primary"
        form={detailsFormId}
        type="submit"
        disabled={savingCustomerDetails || !isValid || !isDirty}
      >
        {savingCustomerDetails ? <span className="loading loading-spinner mr-2" /> : null}
        {t('common.save')}
      </button>
    </>
  );

  return (
    <DetailsPanel
      title={
        <>
          <User size={24} className="mr-2" /> {customer?.name || t('New Customer')}
        </>
      }
      onClose={() => navigate('..')}
      actions={actions}
      loading={isLoading || savingCustomerDetails}
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
          <div role="tablist" className="tabs tabs-lifted">
            <input
              type="radio"
              name="customer_tabs"
              role="tab"
              className="tab"
              aria-label={t('common.details')}
              checked={activeTab === 'details'}
              onChange={() => setActiveTab('details')}
            />
            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 rounded-box p-6"
            >
              {isError ? <p>Error: {error.message}</p> : <CustomerForm />}
            </div>

            <input
              type="radio"
              name="customer_tabs"
              role="tab"
              className="tab"
              aria-label={t('common.addresses')}
              checked={activeTab === 'addresses'}
              onChange={() => setActiveTab('addresses')}
            />
            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 rounded-box p-6"
            >
              {fields.map((address, index) => (
                <div className="mt-2" key={fields[index].id}>
                  <AddressForm
                    index={index}
                    address={address}
                    onRemove={() => remove(index)}
                  ></AddressForm>
                </div>
              ))}
            </div>
          </div>
        </form>
      </FormProvider>
    </DetailsPanel>
  );
}
