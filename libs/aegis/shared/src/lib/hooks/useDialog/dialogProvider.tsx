import { createContext, PropsWithChildren, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { DialogContextType } from './models/dialogContextType';
import { DialogOptions } from './models/dialogOptions';

export const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider = ({ children }: PropsWithChildren) => {
  const [dialogs, setDialogs] = useState<DialogOptions[]>([]);

  const showDialog = (options: Omit<DialogOptions, 'id'>) => {
    const id = crypto.randomUUID();
    setDialogs((prev) => [...prev, { ...options, id }]);
    return id;
  };

  const closeDialog = (id: string) => {
    setDialogs((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <DialogContext.Provider value={{ showDialog, closeDialog }}>
      {children}

      {dialogs.map((dialog, index) => (
        <Modal
          key={dialog.id}
          show
          size={dialog.size}
          onHide={() => closeDialog(dialog.id)}
          centered
          backdrop={dialog.backdrop ?? (index === dialogs.length - 1 ? true : 'static')}
        >
          {dialog.title && (
            <Modal.Header closeButton>
              <Modal.Title>{dialog.title}</Modal.Title>
            </Modal.Header>
          )}

          {dialog.content && <Modal.Body>{dialog.content}</Modal.Body>}

          {dialog.actions && <Modal.Footer>{dialog.actions}</Modal.Footer>}
        </Modal>
      ))}
    </DialogContext.Provider>
  );
};
