import { useContext, useEffect } from 'react';
import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useMatch, useNavigate } from 'react-router';
import DetailsPanel from '../../../components/layout/detailsPanel/detailsPanel';
import { RegisterCustomerInput, UpdateCustomerDetailsInput } from '../../../gql/graphql';
import { toCamelCase } from '../../../utils/toCamelCase';
import CustomersDataContext from '../customersContext';
import { Customer } from '../model/customer.model';
import formConfig from './formConfig';

function CustomerDetails() {
  const navigate = useNavigate();
  const match = useMatch('/customers/:id');
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
    formState: { errors, isValid },
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
              const formFieldName = toCamelCase(fieldName);
              setError(formFieldName as keyof typeof formConfig, { types });
            }
          });
        }
      }
    }
  };

  const renderFieldErrors = (fieldName: string) => {
    const fieldErrors = Object.entries(errors)
      .filter(([key, value]) => key.toLowerCase() === fieldName.toLowerCase() && value)
      .map(([, value]) => value);

    if (fieldErrors.length > 0) {
      return (
        <Form.Control.Feedback type="invalid">
          {fieldErrors.map((fieldError, fieldErrorIndex) => {
            return (
              <div key={fieldName + fieldErrorIndex}>
                {fieldError.message && <div>{fieldError.message}</div>}
                {Object.values(fieldError.types || {}).map((errorMessage, idx) => (
                  <div key={idx}>{errorMessage}</div>
                ))}
              </div>
            );
          })}
        </Form.Control.Feedback>
      );
    }

    return null;
  };

  const actions = (
    <>
      <Button variant="primary" type="submit" disabled={savingCustomerDetails || !isValid}>
        {savingCustomerDetails ? <Spinner animation="border" size="sm" className="me-2" /> : null}
        Save Changes
      </Button>
      <Button variant="secondary" onClick={() => navigate('..')}>
        Cancel
      </Button>
    </>
  );

  return (
    <Form className="h-100" noValidate onSubmit={handleSubmit(onSubmit)}>
      <DetailsPanel
        title={customer?.name || 'New Customer'}
        onClose={() => navigate('..')}
        actions={actions}
        loading={loadingCustomerDetails || savingCustomerDetails}
      >
        {
          <>
            <Form.Group as={Row} className="mb-3" controlId="customerCode">
              <Form.Label column sm={3}>
                Code
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Enter customer code"
                  {...register('code', formConfig.code.config)}
                  isInvalid={!!errors.code}
                />
                {renderFieldErrors('code')}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="customerName">
              <Form.Label column sm={3}>
                Name
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Enter customer name"
                  {...register('name', formConfig.name.config)}
                  isInvalid={!!errors.name}
                />
                {renderFieldErrors('name')}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="customerWebsite">
              <Form.Label column sm={3}>
                Website
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Enter customer website"
                  {...register('website', formConfig.website.config)}
                  isInvalid={!!errors.website}
                />
                {renderFieldErrors('website')}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="customerEmail">
              <Form.Label column sm={3}>
                Email
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="email"
                  placeholder="Enter customer email"
                  {...register('email', formConfig.email.config)}
                  isInvalid={!!errors.email}
                />
                {renderFieldErrors('email')}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="customerPhoneNumber">
              <Form.Label column sm={3}>
                Phone Number
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="tel"
                  placeholder="Enter customer phone number"
                  {...register('phoneNumber', formConfig.phoneNumber.config)}
                  isInvalid={!!errors.phoneNumber}
                />
                {renderFieldErrors('phoneNumber')}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="customerIban">
              <Form.Label column sm={3}>
                IBAN
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Enter customer IBAN"
                  {...register('iban', formConfig.iban.config)}
                  isInvalid={!!errors.iban}
                />
                {renderFieldErrors('iban')}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="customerBic">
              <Form.Label column sm={3}>
                BIC
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Enter customer BIC"
                  {...register('bic', formConfig.bic.config)}
                  isInvalid={!!errors.bic}
                />
                {renderFieldErrors('bic')}
              </Col>
            </Form.Group>
          </>
        }

        {loadingCustomerDetailsError && <p>Error: {loadingCustomerDetailsError.message}</p>}
        {errors.root &&
          Object.values(errors.root.types || {})
            .flatMap((v) => v)
            .map((error, idx) => (
              <p key={idx}>
                <Alert variant="danger">{error}</Alert>
              </p>
            ))}
      </DetailsPanel>
    </Form>
  );
}
export default CustomerDetails;
