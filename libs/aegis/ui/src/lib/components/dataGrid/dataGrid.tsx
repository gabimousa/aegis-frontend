import { ReactNode, useState } from 'react';
import { DotsVertical } from 'tabler-icons-react';
import { Dropdown } from '../dropdown';
import { DataGridColumn } from './dataGridColumn';

type Action = {
  key: string;
  label?: string | ReactNode;
};

export type DataGridProps<T> = {
  keyAccessor: keyof T | ((item: T) => string | number);
  columns: DataGridColumn<T>[];
  data: T[] | undefined;
  customActions?: Action[];
  editLabel?: string | ReactNode;
  deleteLabel?: string | ReactNode;
  canLoadMore?: boolean;
  loading?: boolean;
  enableSelect?: boolean;
  onSelect?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onAction?: (action: Action, item: T) => void;
  onLoadMore?: () => void;
};

export function DataGrid<T>({
  columns,
  data,
  keyAccessor,
  customActions,
  editLabel,
  deleteLabel,
  loading,
  canLoadMore,
  onEdit,
  onDelete,
  onLoadMore,
  onAction,
  enableSelect,
  onSelect,
}: DataGridProps<T>) {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const getKey = (item: T, index: number): string | number => {
    if (typeof item === 'object' && item !== null) {
      if (typeof keyAccessor === 'function') {
        return keyAccessor(item);
      } else {
        return `${item[keyAccessor]}`;
      }
    }
    return index;
  };

  const getWidth = (width: number | string | undefined) => {
    if (typeof width === 'number') {
      return `${width}px`;
    }
    return width ?? 'auto';
  };

  const onTableScroll = (event: React.UIEvent<HTMLTableElement>) => {
    const target = event.target as HTMLDivElement;
    if (!loading && canLoadMore && onLoadMore) {
      if (target.scrollHeight - target.scrollTop <= target.clientHeight + 100) {
        onLoadMore();
      }
    }
  };

  const actions: (Action | 'SEPARATOR')[] = [];
  if (onEdit) {
    actions.push({ key: 'edit', label: editLabel });
  }
  if (onDelete) {
    actions.push({ key: 'delete', label: deleteLabel });
  }

  if (actions.length && customActions?.length) {
    actions.push('SEPARATOR');
  }

  if (customActions?.length) {
    actions.push(...customActions);
  }

  const getRowClasses = (item: T, index: number) => {
    if (selectedItem && getKey(item, index) === getKey(selectedItem, -1)) {
      return 'bg-primary/50 hover:bg-primary/80!';
    } else {
      return 'bg-base-100 hover:bg-primary-content!';
    }
  };

  return (
    <div className="relative h-full w-full">
      {loading && (
        <div className="bg-base-100 bg-opacity-80 absolute inset-0 z-10 flex items-center justify-center">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      )}
      <div className="h-full w-full overflow-x-auto" onScroll={onTableScroll}>
        <table className="table-pin-rows table-pin-cols isolate table w-full">
          <thead className="bg-base-200">
            <tr>
              {columns.map((column, index) => (
                <th
                  className="whitespace-nowrap"
                  key={`${column.field?.toString()}-${index}`}
                  style={{ minWidth: getWidth(column.width), textAlign: column.align }}
                >
                  {column.header}
                </th>
              ))}
              {!!actions.length && <th style={{ width: `50px` }}></th>}
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr
                className={getRowClasses(item, index)}
                key={`${getKey(item, index)}-${index}`}
                onClick={() => {
                  if (enableSelect) {
                    setSelectedItem(item);
                    onSelect && onSelect(item);
                  }
                }}
              >
                {columns.map((column) => (
                  <td
                    className="align-middle whitespace-nowrap"
                    key={`${index}-${column.field?.toString()}`}
                    style={{
                      width: getWidth(column.width),
                      textAlign: column.align,
                    }}
                  >
                    {column.cellTemplate
                      ? column.cellTemplate(item)
                      : column.field && String(item[column.field] ?? '')}
                  </td>
                ))}
                {!!actions.length && (
                  // Fix 1 pix border on action column to separate from data columns */}
                  <th className="bg-inherit py-0 pl-0 font-normal shadow-[1px_0_0_0_var(--color-base-100)]">
                    <Dropdown
                      btnStyle="ghost"
                      items={actions}
                      label={<DotsVertical size={16}></DotsVertical>}
                      labelSelector={(action) => action.label}
                      onSelect={(action) => {
                        if (action.key === 'edit' && onEdit) {
                          onEdit(item);
                        } else if (action.key === 'delete' && onDelete) {
                          onDelete(item);
                        } else {
                          onAction && onAction(action, item);
                        }
                      }}
                      position="left"
                    ></Dropdown>
                  </th>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
