import { useMatch, useNavigate } from 'react-router';
import { MasterDetail } from '../../components';
import { useSupplierSubscriptions } from './data';
import { SupplierList } from './supplierList/supplierList';

export function Suppliers() {
  useSupplierSubscriptions();
  const match = useMatch('/suppliers/:id');
  const navigate = useNavigate();

  return (
    <MasterDetail detailsOpen={!!match} onBackdropClick={() => navigate('')}>
      <SupplierList />
    </MasterDetail>
  );
}
