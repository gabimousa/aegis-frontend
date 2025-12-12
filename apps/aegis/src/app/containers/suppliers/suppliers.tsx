import { useMatch, useNavigate } from 'react-router';
import MasterDetail from '../../components/layout/masterDetail/masterDetail';
import { SuppliersDataProvider } from './data/suppliersContext';
import SupplierList from './supplierList/supplierList';

function Suppliers() {
  const match = useMatch('/suppliers/:id');
  const navigate = useNavigate();

  return (
    <SuppliersDataProvider>
      <MasterDetail detailsOpen={!!match} onBackdropClick={() => navigate('')}>
        <SupplierList />
      </MasterDetail>
    </SuppliersDataProvider>
  );
}

export default Suppliers;
