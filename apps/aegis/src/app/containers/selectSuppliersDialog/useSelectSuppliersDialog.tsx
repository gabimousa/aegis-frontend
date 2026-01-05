import { useDialog } from '@aegis/shared';
import { useTranslation } from 'react-i18next';
import { SelectSuppliersDialog } from './SelectSuppliersDialog';

export const useSelectSuppliersDialog = () => {
  const { showDialog, closeDialog } = useDialog();
  const { t } = useTranslation();

  const openDialog = () => {
    return new Promise((resolve) => {
      const id = showDialog({
        fullscreen: true,
        size: 'xl',
        content: <SelectSuppliersDialog />,
        actions: (
          <>
            <button
              className="btn btn-secondary"
              onClick={() => {
                closeDialog(id);
                resolve(false);
              }}
            >
              {t('common.cancel')}
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                closeDialog(id);
                resolve(true);
              }}
            >
              {t('common.confirm')}
            </button>
          </>
        ),
      });
    });
  };
  return { openDialog };
};
