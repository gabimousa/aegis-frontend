import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useDialog } from '../useDialog/useDialog';

export const useConfirm = () => {
  const { showDialog, closeDialog } = useDialog();
  const { t } = useTranslation();

  const confirm = (title: string | ReactNode, message: string | ReactNode): Promise<boolean> => {
    return new Promise((resolve) => {
      const id = showDialog({
        title,
        content: message,
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

  return { confirm };
};
