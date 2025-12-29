import { useMatch, useNavigate } from 'react-router';
import MasterDetail from '../../components/layout/masterDetail/masterDetail';
import CustomerList from './customerList/customerList';
import { useCustomerSubscriptions } from './data/hooks';

function Customers() {
  useCustomerSubscriptions();
  const match = useMatch('/customers/:id');
  const navigate = useNavigate();

  return (
    <MasterDetail detailsOpen={!!match} onBackdropClick={() => navigate('')}>
      <CustomerList />
    </MasterDetail>
  );
}

export default Customers;
