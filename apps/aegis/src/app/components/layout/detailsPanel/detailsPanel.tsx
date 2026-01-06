import { PropsWithChildren, ReactElement } from 'react';
import { X } from 'tabler-icons-react';

type DetailsPanelProps = {
  title: ReactElement | string;
  onClose?: () => void;
  actions?: ReactElement;
  loading?: boolean;
};

export function DetailsPanel({
  title,
  actions,
  children,
  loading,
  onClose,
}: PropsWithChildren<DetailsPanelProps>) {
  return (
    <div className="border-base-300 relative flex h-full w-full flex-col border-l">
      <div className="border-base-300 flex items-center justify-between border-b p-3">
        <div className="text-primary flex grow items-center text-xl font-medium">{title}</div>
        <button
          className="btn btn-ghost btn-sm text-red-500 hover:text-red-600"
          onClick={() => onClose && onClose()}
        >
          <X size={20}></X>
        </button>
      </div>
      <div className="grow overflow-y-auto p-2">{children}</div>
      {actions && (
        <div className="border-base-300 mb-2 flex justify-end gap-2 border-t px-4 py-3">
          {actions}
        </div>
      )}
      {loading && (
        <div className="absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-white/70 dark:bg-gray-800/70">
          <span className="loading loading-spinner loading-lg">
            <span className="sr-only">Loading...</span>
          </span>
        </div>
      )}
    </div>
  );
}
