import { useConfirm } from '@aegis/shared';
import { useTranslation } from 'react-i18next';
import { useMatch, useNavigate } from 'react-router';
import { MasterDetail } from '../../components';
import { useDeactivateSupplier, useSupplierSubscriptions } from './data';
import { SupplierModel } from './model';
import { SupplierList } from './supplierList/supplierList';

export function Suppliers() {
  useSupplierSubscriptions();
  const match = useMatch('/suppliers/:id');
  const navigate = useNavigate();
  const { confirm } = useConfirm();
  const { mutate: deactivate } = useDeactivateSupplier();
  const { t } = useTranslation();

  const confirmDeactivate = async (supplier: SupplierModel) => {
    const confirmed = await confirm(
      t('suppliers.deactivateSupplierTitle'),
      t('suppliers.deactivateSupplierMessage', { name: supplier.name }),
    );
    if (confirmed) {
      deactivate(supplier.id);
    }
  };

  return (
    <MasterDetail detailsOpen={!!match} onBackdropClick={() => navigate('')}>
      <SupplierList
        enabledAdd={true}
        enabledDelete={true}
        enabledEdit={true}
        onAdd={() => navigate('./NEW')}
        onDelete={(supplier) => confirmDeactivate(supplier)}
        onEdit={(supplier) => navigate(`./${encodeURIComponent(supplier.id)}`)}
      />
    </MasterDetail>
  );
}
