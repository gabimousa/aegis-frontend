import { SupplierList } from '../suppliers/supplierList';

export function SelectSuppliersDialog() {
  return <SupplierList enabledAdd={false} enabledDelete={false} enabledEdit={false} />;
}
