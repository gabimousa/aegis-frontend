import { useConfirm } from '@aegis/shared';
import { useTranslation } from 'react-i18next';
import { useMatch, useNavigate } from 'react-router';
import { MasterDetail } from '../../components';
import { CustomerList } from './customerList';
import { useCustomerSubscriptions, useDeactivateCustomer } from './data';
import { CustomerModel } from './model';

export function Customers() {
  useCustomerSubscriptions();
  const navigate = useNavigate();
  const { confirm } = useConfirm();
  const { t } = useTranslation();
  const match = useMatch('/customers/:id');
  const { mutate: deactivate } = useDeactivateCustomer();

  const confirmDeactivate = async (customer: CustomerModel) => {
    const confirmed = await confirm(
      t('customers.deactivateCustomerTitle'),
      t('customers.deactivateCustomerMessage', { name: customer.name }),
    );
    if (confirmed) {
      deactivate(customer.id);
    }
  };

  return (
    <MasterDetail detailsOpen={!!match} onBackdropClick={() => navigate('')}>
      <CustomerList
        enabledAdd
        enabledDelete
        enabledEdit
        onAdd={() => navigate('./NEW')}
        onEdit={(customer) => navigate(`./${encodeURIComponent(customer.id)}`)}
        onDelete={confirmDeactivate}
      />
    </MasterDetail>
  );
}
