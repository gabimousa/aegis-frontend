import { useMatch, useNavigate } from 'react-router';
import { MasterDetail } from '../../components';
import { CustomerList } from './customerList';
import { useCustomerSubscriptions, useDeactivateCustomer } from './data';

export function Customers() {
  useCustomerSubscriptions();
  const match = useMatch('/customers/:id');
  const navigate = useNavigate();
  const { mutate: deactivate } = useDeactivateCustomer();

  return (
    <MasterDetail detailsOpen={!!match} onBackdropClick={() => navigate('')}>
      <CustomerList
        enabledAdd
        enabledDelete
        enabledEdit
        onAdd={() => navigate('./NEW')}
        onDelete={(customer) => deactivate(customer.id)}
        onEdit={(customer) => navigate(`./${encodeURIComponent(customer.id)}`)}
      />
    </MasterDetail>
  );
}
