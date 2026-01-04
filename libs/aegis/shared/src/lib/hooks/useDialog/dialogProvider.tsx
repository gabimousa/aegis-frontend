import { createContext, PropsWithChildren, useState } from 'react';
import { X } from 'tabler-icons-react';
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

  const getSizeClass = (size?: 'sm' | 'lg' | 'xl') => {
    switch (size) {
      case 'sm':
        return 'modal-box-sm max-w-sm';
      case 'lg':
        return 'modal-box-lg max-w-2xl';
      case 'xl':
        return 'modal-box-xl max-w-5xl';
      default:
        return 'modal-box';
    }
  };

  return (
    <DialogContext.Provider value={{ showDialog, closeDialog }}>
      {children}

      {dialogs.map((dialog, index) => (
        <div key={dialog.id} className="modal modal-open">
          <div className={`modal-box relative ${getSizeClass(dialog.size)}`}>
            {/* Close button */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => closeDialog(dialog.id)}
            >
              <X size={20}></X>
            </button>

            {/* Title */}
            {dialog.title && <h3 className="font-bold text-lg mb-4">{dialog.title}</h3>}

            {/* Content */}
            {dialog.content && <div className="py-4">{dialog.content}</div>}

            {/* Actions */}
            {dialog.actions && <div className="modal-action">{dialog.actions}</div>}
          </div>
          {/* Backdrop */}
          {dialog.backdrop !== false && (
            <div
              className="modal-backdrop"
              onClick={() => dialog.backdrop !== 'static' && closeDialog(dialog.id)}
            />
          )}
        </div>
      ))}
    </DialogContext.Provider>
  );
};
