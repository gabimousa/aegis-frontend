import { useContext, useEffect } from 'react';
import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMatch, useNavigate } from 'react-router';
import FieldErrorsFeedback from '../../../components/fieldErrorsFeedback/fieldErrorsFeedback';
import DetailsPanel from '../../../components/layout/detailsPanel/detailsPanel';
import { RegisterCustomerInput, UpdateCustomerDetailsInput } from '../../../gql/graphql';
import setErrors from '../../../utils/setErrors';
import CustomersDataContext from '../customersContext';
import { Customer } from '../model/customer.model';
import formConfig from './formConfig';

function CustomerDetails() {
  const navigate = useNavigate();
  const match = useMatch('/customers/:id');
  const { t } = useTranslation();
  const {
    selectCustomer,
    selectedCustomer: customer,
    loadingCustomerDetails,
    loadingCustomerDetailsError,
    saveCustomerDetails,
    savingCustomerDetails,
  } = useContext(CustomersDataContext);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isValid, isDirty },
  } = useForm<Customer>({ mode: 'all' });
  useEffect(() => {
    const customerId = match?.params.id;
    selectCustomer(customerId);
    return () => selectCustomer(undefined);
  }, [match?.params.id, selectCustomer]);

  useEffect(() => {
    reset(customer);
  }, [customer, reset]);

  const onSubmit = async (customer: Customer) => {
    const idInput = customer?.id ? { id: customer.id } : {};
    try {
      const result = await saveCustomerDetails({
        ...idInput,
        code: customer.code,
        name: customer.name,
        website: customer.website,
        email: customer.email,
        phoneNumber: customer.phoneNumber,
        iban: customer.iban,
        bic: customer.bic,
      } as RegisterCustomerInput | UpdateCustomerDetailsInput);

      result && navigate('..');
    } catch (error) {
      setErrors(error, setError);
    }
  };

  const actions = (
    <>
      <Button
        variant="primary"
        type="submit"
        disabled={savingCustomerDetails || !isValid || !isDirty}
      >
        {savingCustomerDetails ? <Spinner animation="border" size="sm" className="me-2" /> : null}
        {t('common.save')}
      </Button>
      <Button variant="secondary" onClick={() => navigate('..')}>
        {t('common.cancel')}
      </Button>
    </>
  );

  return (
    <Form className="h-100" noValidate onSubmit={handleSubmit(onSubmit)}>
      <DetailsPanel
        title={customer?.name || t('New Customer')}
        onClose={() => navigate('..')}
        actions={actions}
        loading={loadingCustomerDetails || savingCustomerDetails}
      >
        {
          <>
            <Form.Group as={Row} className="mb-3" controlId="customerCode">
              <Form.Label column sm={3}>
                {t('code')}
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder={t('customers.enterCustomerCode')}
                  {...register('code', formConfig.code.registerConfig)}
                  isInvalid={!!errors.code}
                />
                <FieldErrorsFeedback errors={errors} fieldNames={['code', 'Code']} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="customerName">
              <Form.Label column sm={3}>
                {t('name')}
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder={t('customers.enterCustomerName')}
                  {...register('name', formConfig.name.registerConfig)}
                  isInvalid={!!errors.name}
                />
                <FieldErrorsFeedback errors={errors} fieldNames={['name', 'Name']} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="customerWebsite">
              <Form.Label column sm={3}>
                {t('website')}
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder={t('customers.enterCustomerWebsite')}
                  {...register('website', formConfig.website.registerConfig)}
                  isInvalid={!!errors.website}
                />
                <FieldErrorsFeedback errors={errors} fieldNames={['website', 'Website']} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="customerEmail">
              <Form.Label column sm={3}>
                {t('email')}
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="email"
                  placeholder={t('customers.enterCustomerEmail')}
                  {...register('email', formConfig.email.registerConfig)}
                  isInvalid={!!errors.email}
                />
                <FieldErrorsFeedback errors={errors} fieldNames={['email', 'Email']} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="customerPhoneNumber">
              <Form.Label column sm={3}>
                {t('phoneNumber')}
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="tel"
                  placeholder={t('customers.enterCustomerPhoneNumber')}
                  {...register('phoneNumber', formConfig.phoneNumber.registerConfig)}
                  isInvalid={!!errors.phoneNumber}
                />
                <FieldErrorsFeedback errors={errors} fieldNames={['phoneNumber', 'Phone Number']} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="customerIban">
              <Form.Label column sm={3}>
                {t('iban')}
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder={t('customers.enterCustomerIban')}
                  {...register('iban', formConfig.iban.registerConfig)}
                  isInvalid={!!errors.iban}
                />
                <FieldErrorsFeedback errors={errors} fieldNames={['iban', 'IBAN']} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="customerBic">
              <Form.Label column sm={3}>
                {t('bic')}
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder={t('customers.enterCustomerBic')}
                  {...register('bic', formConfig.bic.registerConfig)}
                  isInvalid={!!errors.bic}
                />
                <FieldErrorsFeedback errors={errors} fieldNames={['bic', 'BIC']} />
              </Col>
            </Form.Group>
          </>
        }

        {loadingCustomerDetailsError && <p>Error: {loadingCustomerDetailsError.message}</p>}
        {errors.root &&
          Object.values(errors.root.types || {})
            .flatMap((v) => v)
            .map((error, idx) => (
              <p key={'root-error-' + idx}>
                <Alert variant="danger">{error}</Alert>
              </p>
            ))}
      </DetailsPanel>
    </Form>
  );
}
export default CustomerDetails;
