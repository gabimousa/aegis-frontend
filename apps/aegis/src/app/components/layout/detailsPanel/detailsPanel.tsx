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
    <div className="flex flex-col w-full h-full border-l border-base-300 relative">
      <div className="p-3 border-b border-base-300 flex items-center justify-between">
        <div className="text-xl font-medium grow flex items-center text-blue-600 dark:text-blue-400">
          {title}
        </div>
        <button
          className="btn btn-ghost btn-sm text-red-500 hover:text-red-600"
          onClick={() => onClose && onClose()}
        >
          <X size={20}></X>
        </button>
      </div>
      <div className="grow p-4 overflow-y-auto">{children}</div>
      {actions && (
        <div className="mb-2 p-4 border-t border-base-300 flex justify-end gap-2">{actions}</div>
      )}
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-white/70 dark:bg-gray-800/70 flex items-center justify-center z-10">
          <span className="loading loading-spinner loading-lg">
            <span className="sr-only">Loading...</span>
          </span>
        </div>
      )}
    </div>
  );
}
