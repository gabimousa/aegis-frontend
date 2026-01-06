import { useDialog } from '@aegis/shared';
import { SelectSuppliersDialog } from './SelectSuppliersDialog';

export const useSelectSuppliersDialog = () => {
  const { showDialog, closeDialog } = useDialog();

  const openDialog = () => {
    return new Promise((resolve) => {
      const id = showDialog({
        fullscreen: true,
        size: 'xl',
        content: (
          <SelectSuppliersDialog
            onCancel={() => closeDialog(id)}
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
