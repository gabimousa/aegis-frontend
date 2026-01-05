import { createContext, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { X } from 'tabler-icons-react';
import { DialogContextType } from './models/dialogContextType';
import { DialogOptions } from './models/dialogOptions';

export const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider = ({ children }: PropsWithChildren) => {
  const [dialogs, setDialogs] = useState<DialogOptions[]>([]);

  const dialogRefs = useRef<Record<string, HTMLDialogElement | null>>({});

  const showDialog = (options: Omit<DialogOptions, 'id'>) => {
    const id = crypto.randomUUID();
    setDialogs((prev) => [...prev, { ...options, id }]);
    return id;
  };

  const closeDialog = (id: string) => {
    dialogRefs.current[id]?.close();
    setDialogs((prev) => prev.filter((d) => d.id !== id));
  };

  const getSizeClass = (size?: 'sm' | 'lg' | 'xl') => {
    switch (size) {
      case 'sm':
        return 'max-w-sm';
      case 'lg':
        return 'max-w-2xl';
      case 'xl':
        return 'max-w-5xl';
      default:
        return '';
    }
  };

  useEffect(() => {
    // Open any newly added dialogs
    dialogs.forEach((d) => {
      if (!dialogRefs.current[d.id]?.open) {
        dialogRefs.current[d.id]?.showModal();
      }
    });
  }, [dialogs]);

  return (
    <DialogContext.Provider value={{ showDialog, closeDialog }}>
      {children}

      {dialogs.map((dialog, index) => (
        <dialog
          key={dialog.id}
          ref={(el) => {
            dialogRefs.current[dialog.id] = el;
          }}
          className="modal"
          onCancel={(e) => {
            if (dialog.backdrop === 'static') {
              e.preventDefault();
              return;
            }

            // Sync ESC close back to React state
            closeDialog(dialog.id);
          }}
          onClose={() => {
            // Ensure state is updated even when closed natively
            setDialogs((prev) => prev.filter((d) => d.id !== dialog.id));
          }}
          onClick={(e) => {
            const dlg = dialogRefs.current[dialog.id];
            if (!dlg) return;

            const rect = dlg.getBoundingClientRect();
            const clickedOutside =
              e.clientX < rect.left ||
              e.clientX > rect.right ||
              e.clientY < rect.top ||
              e.clientY > rect.bottom;

            // Click outside closes unless static or disabled
            if (clickedOutside && dialog.backdrop !== 'static' && dialog.backdrop !== false) {
              closeDialog(dialog.id);
            }
          }}
        >
          <div
            className={`modal-box relative flex ${dialog.fullscreen ? 'h-[90vh]' : 'max-h-[90vh]'} flex-col ${getSizeClass(dialog.size)}`}
          >
            {/* Fixed Header */}
            <div className="relative shrink-0">
              <span
                className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2 z-10"
                onClick={() => closeDialog(dialog.id)}
              >
                <X size={20} />
              </span>
              {dialog.title && <h3 className="mb-4 pr-12 text-lg font-bold">{dialog.title}</h3>}
            </div>

            {/* Scrollable Content - Always fills remaining space */}
            <div className="min-h-0 flex-1 overflow-y-auto px-4">{dialog.content}</div>

            {/* Fixed Actions */}
            {dialog.actions && <div className="modal-action mt-4 shrink-0">{dialog.actions}</div>}
          </div>

          {/* Optional backdrop disabling */}
          {dialog.backdrop === false && <form method="dialog" className="hidden"></form>}
        </dialog>
      ))}
    </DialogContext.Provider>
  );
};
