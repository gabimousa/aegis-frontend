import { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { useMatch, useNavigate } from 'react-router';
import DetailsPanel from '../../../components/layout/detailsPanel/detailsPanel';
import { RegisterCustomerInput, UpdateCustomerDetailsInput } from '../../../gql/graphql';
import CustomersDataContext from '../customersContext';
import { Customer } from '../model/customer';

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
    customerDetailsSaveErrors,
  } = useContext(CustomersDataContext);

  useEffect(() => {
    const customerId = match?.params.id;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    selectCustomer(customerId!);
    return () => selectCustomer(undefined);
  }, [match?.params.id, selectCustomer]);

  const [customerDetails, setCustomerDetails] = useState<Partial<Customer> | null>(null);
  useEffect(() => {
    setCustomerDetails({
      name: customer?.name ?? '',
      code: customer?.code ?? '',
      website: customer?.website ?? undefined,
      email: customer?.email ?? undefined,
      phoneNumber: customer?.phoneNumber ?? undefined,
      iban: customer?.iban ?? undefined,
      bic: customer?.bic ?? undefined,
    });
  }, [customer]);
  const [validated, setValidated] = useState(false);

  const handleInputChange = (field: keyof Customer) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    setValidated(true);
    if (!form.checkValidity()) {
      return;
    }

    const idInput = customer?.id ? { id: customer.id } : {};
    const result = await saveCustomerDetails({
      ...idInput,
      ...customerDetails,
    } as RegisterCustomerInput | UpdateCustomerDetailsInput);
    if (result) {
      navigate('..');
    }
  };

  const actions = (
    <>
      <Button variant="primary" type="submit">
        {savingCustomerDetails ? <Spinner animation="border" size="sm" className="me-2" /> : null}
        Save Changes
      </Button>
      <Button variant="secondary" onClick={() => navigate('..')}>
        Cancel
      </Button>
    </>
  );

  return (
    <Form className="h-100" noValidate validated={validated} onSubmit={handleSubmit}>
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
                  required
                  type="text"
                  placeholder="Enter customer code"
                  value={customerDetails?.code || ''}
                  onChange={handleInputChange('code')}
                />
              </Col>
              <Form.Control.Feedback type="invalid">
                Please provide a valid code.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="customerName">
              <Form.Label column sm={3}>
                Name
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter customer name"
                  value={customerDetails?.name || ''}
                  onChange={handleInputChange('name')}
                />
              </Col>
              <Form.Control.Feedback type="invalid">
                Please provide a valid name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="customerWebsite">
              <Form.Label column sm={3}>
                Website
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Enter customer website"
                  value={customerDetails?.website || ''}
                  onChange={handleInputChange('website')}
                />
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
                  value={customerDetails?.email || ''}
                  onChange={handleInputChange('email')}
                />
              </Col>
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="customerPhoneNumber">
              <Form.Label column sm={3}>
                Phone Number
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="tel"
                  placeholder="Enter customer phone number"
                  value={customerDetails?.phoneNumber || ''}
                  onChange={handleInputChange('phoneNumber')}
                />
              </Col>
              <Form.Control.Feedback type="invalid">
                Please provide a valid phone number.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="customerIban">
              <Form.Label column sm={3}>
                IBAN
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Enter customer IBAN"
                  value={customerDetails?.iban || ''}
                  onChange={handleInputChange('iban')}
                />
              </Col>
              <Form.Control.Feedback type="invalid">
                Please provide a valid IBAN.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="customerBic">
              <Form.Label column sm={3}>
                BIC
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Enter customer BIC"
                  value={customerDetails?.bic || ''}
                  onChange={handleInputChange('bic')}
                />
              </Col>
              <Form.Control.Feedback type="invalid">
                Please provide a valid BIC.
              </Form.Control.Feedback>
            </Form.Group>
          </>
        }

        {loadingCustomerDetailsError && <p>Error: {loadingCustomerDetailsError.message}</p>}
        {customerDetailsSaveErrors &&
          customerDetailsSaveErrors.map((error) => (
            <p key={error.code}>Error: {error.description}</p>
          ))}
      </DetailsPanel>
    </Form>
  );
}
export default CustomerDetails;
