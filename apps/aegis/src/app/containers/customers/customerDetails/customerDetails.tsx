import { useMatch } from 'react-router';
import { useCustomerDetails } from './data/useCustomerDetails';

function CustomerDetails() {
  const match = useMatch('/customers/:id');
  const { customer, loading, error } = useCustomerDetails(
    match?.params.id || ''
  );

  return (
    <div>
      {customer && (
        <div>
          <p>ID: {customer.id}</p>
          <p>Name: {customer.name}</p>
          <p>Code: {customer.code}</p>
          <p>Website: {customer.website}</p>
          <p>Email: {customer.email}</p>
          <p>Phone Number: {customer.phoneNumber}</p>
          <p>IBAN: {customer.iban}</p>
          <p>BIC: {customer.bic}</p>
        </div>
      )}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
export default CustomerDetails;
