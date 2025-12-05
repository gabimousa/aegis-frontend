import { useContext, useEffect, useId, useState } from 'react';
import { Alert, Button, Dropdown, Form, Spinner, Tab, Tabs } from 'react-bootstrap';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMatch, useNavigate } from 'react-router';
import { User } from 'tabler-icons-react';
import DetailsPanel from '../../../components/layout/detailsPanel/detailsPanel';
import {
  Alpha3Code,
  CreateAddressInput,
  RegisterCustomerInput,
  UpdateAddressInput,
  UpdateCustomerDetailsInput,
} from '../../../gql/graphql';
import setFieldErrors from '../../../utils/setFieldErrors';
import CustomersDataContext from '../customersContext';
import { CustomerAddressModel, CustomerDetailsModel } from '../model/customerDetails.model';
import AddressForm from './addressForm/addressForm';
import CustomerForm from './customerForm/customerForm';

const serverErrorMap: Record<string, string> = {
  Code: 'code',
  Name: 'name',
  Website: 'website',
  Email: 'email',
  PhoneNumber: 'phoneNumber',
  IBAN: 'iban',
  BIC: 'bic',
};

function CustomerDetails() {
  const [activeTab, setActiveTab] = useState('details');
  const detailsFormId = useId();
  const navigate = useNavigate();
  const match = useMatch('/customers/:id');
  const { t } = useTranslation();
  const {
    details: {
      selectCustomer,
      selectedCustomer: customer,
      loadingCustomerDetails,
      loadingCustomerDetailsError,
      saveCustomerDetails,
      savingCustomerDetails,
    },
  } = useContext(CustomersDataContext);

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
    const customerId = match?.params.id;
    selectCustomer(customerId);
    return () => selectCustomer(undefined);
  }, [match?.params.id, selectCustomer]);

  useEffect(() => {
    reset(customer);
  }, [customer, reset]);

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
    const getAddressBase = (address: CustomerAddressModel): Partial<CreateAddressInput> => {
      return {
        street: address.street,
        number: address.number,
        zipCode: address.zipCode,
        city: address.city,
        state: address.state,
        countryCode: address.countryCode,
      };
    };

    const getCreateAddressInput = (address: CustomerAddressModel): CreateAddressInput => {
      return { ...getAddressBase(address), type: address.type };
    };

    const getUpdateAddressInput = (address: CustomerAddressModel): UpdateAddressInput => {
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

  const onSubmit = async (formState: CustomerDetailsModel) => {
    console.log('Submitting customer details:', formState);
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

      const result = await saveCustomerDetails(
        getCustomerInputWithAddresses(formState, customerInput)
      );

      result && navigate('..');
    } catch (error) {
      setFieldErrors(error, setError, serverErrorMap);
    }
  };

  const actions = (
    <>
      {activeTab === 'addresses' && (
        <Dropdown className="ms-2">
          <Dropdown.Toggle
            disabled={!canAppendAddress}
            variant="outline-secondary"
            id="dropdown-add-address"
          >
            {t('addresses.addAddress')}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              disabled={!canAppendAddressTypes('VISITING')}
              onClick={() => appendAddress('VISITING')}
            >
              {t('addresses.visiting')}
            </Dropdown.Item>
            <Dropdown.Item
              disabled={!canAppendAddressTypes('MAILING')}
              onClick={() => appendAddress('MAILING')}
            >
              {t('addresses.mailing')}
            </Dropdown.Item>
            <Dropdown.Item
              disabled={!canAppendAddressTypes('DELIVERY')}
              onClick={() => appendAddress('DELIVERY')}
            >
              {t('addresses.delivery')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
      <Button variant="secondary" onClick={() => navigate('..')}>
        {t('common.cancel')}
      </Button>
      <Button
        variant="primary"
        form={detailsFormId}
        type="submit"
        disabled={savingCustomerDetails || !isValid || !isDirty}
      >
        {savingCustomerDetails ? <Spinner animation="border" size="sm" className="me-2" /> : null}
        {t('common.save')}
      </Button>
    </>
  );

  return (
    <DetailsPanel
      title={
        <>
          <User size={24} className="me-2" /> {customer?.name || t('New Customer')}
        </>
      }
      onClose={() => navigate('..')}
      actions={actions}
      loading={loadingCustomerDetails || savingCustomerDetails}
    >
      {errors.root &&
        (errors.root.types ? (
          Object.values(errors.root.types)
            .flatMap((v) => v)
            .map((error, idx) => (
              <Alert key={'root-error-' + idx} variant="danger">
                {error}
              </Alert>
            ))
        ) : (
          <Alert variant="danger">{errors.root?.message}</Alert>
        ))}
      <FormProvider {...formProps}>
        <Form id={detailsFormId} noValidate onSubmit={handleSubmit(onSubmit)}>
          <Tabs activeKey={activeTab} onSelect={(tab) => setActiveTab(tab ?? 'details')}>
            <Tab className="pt-3" eventKey="details" title={t('common.details')}>
              {loadingCustomerDetailsError ? (
                <p>Error: {loadingCustomerDetailsError.message}</p>
              ) : (
                <CustomerForm />
              )}
            </Tab>
            <Tab eventKey="addresses" title={t('common.addresses')}>
              {fields.map((address, index) => (
                <div className="mt-2" key={fields[index].id}>
                  <AddressForm
                    index={index}
                    address={address}
                    onRemove={() => remove(index)}
                  ></AddressForm>
                </div>
              ))}
            </Tab>
          </Tabs>
        </Form>
      </FormProvider>
    </DetailsPanel>
  );
}
export default CustomerDetails;
