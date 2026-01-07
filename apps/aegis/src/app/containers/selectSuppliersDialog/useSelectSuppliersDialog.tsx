import { useDialog } from '@aegis/shared';
import { SupplierModel } from '../suppliers/model';
import { SelectSuppliersDialog } from './SelectSuppliersDialog';

export const useSelectSuppliersDialog = () => {
  const { showDialog, closeDialog } = useDialog();

  const openDialog = (): Promise<SupplierModel | null> => {
    return new Promise((resolve) => {
      const id = showDialog({
        fullscreen: true,
        size: 'xl',
        content: (
          <SelectSuppliersDialog
            onCancel={() => {
              closeDialog(id);
              resolve(null);
            }}
            onConfirm={(supplier) => {
              closeDialog(id);
              resolve(supplier);
            }}
          />
        ),
      });
    });
  };
  return { openDialog };
};
