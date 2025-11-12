import { ReactNode } from 'react';
import { Button } from 'react-bootstrap';
import { useDialog } from './useDialog';

export const useConfirm = () => {
  const { showDialog, closeDialog } = useDialog();

  const confirm = (title: string | ReactNode, message: string | ReactNode): Promise<boolean> => {
    return new Promise((resolve) => {
      const id = showDialog({
        title,
        content: message,
        actions: (
          <>
            <Button
              variant="secondary"
              onClick={() => {
                closeDialog(id);
                resolve(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                closeDialog(id);
                resolve(true);
              }}
            >
              Confirm
            </Button>
          </>
        ),
      });
    });
  };

  return { confirm };
};
