import { useMatch, useNavigate } from 'react-router';
import { MasterDetail } from '../../components';
import { CustomerList } from './customerList/CustomerList';
import { useCustomerSubscriptions } from './data';

export function Customers() {
  useCustomerSubscriptions();
  const match = useMatch('/customers/:id');
  const navigate = useNavigate();

  return (
    <MasterDetail detailsOpen={!!match} onBackdropClick={() => navigate('')}>
      <CustomerList />
    </MasterDetail>
  );
}
