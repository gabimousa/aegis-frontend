import { useMatch, useNavigate } from 'react-router';
import MasterDetail from '../../components/layout/masterDetail/masterDetail';
import CustomerList from './customerList/customerList';
import { CustomerDataProvider } from './customersContext';

function Customers() {
  const match = useMatch('/customers/:id');
  const navigate = useNavigate();

  return (
    <CustomerDataProvider>
      <MasterDetail detailsOpen={!!match} onBackdropClick={() => navigate('')}>
        <CustomerList />
      </MasterDetail>
    </CustomerDataProvider>
  );
}

export default Customers;
