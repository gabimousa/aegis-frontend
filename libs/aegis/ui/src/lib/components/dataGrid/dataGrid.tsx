import { ReactNode } from 'react';
import { DotsVertical } from 'tabler-icons-react';
import { Dropdown } from '../dropdown';
import { DataGridColumn } from './dataGridColumn';

export type DataGridProps<T> = {
  keyAccessor: keyof T | ((item: T) => string | number);
  columns: DataGridColumn<T>[];
  data: T[] | undefined;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  editLabel?: string | ReactNode;
  deleteLabel?: string | ReactNode;
  canLoadMore?: boolean;
  onLoadMore?: () => void;
  loading?: boolean;
};

export function DataGrid<T>({
  columns,
  data,
  keyAccessor,
  onEdit,
  onDelete,
  editLabel,
  deleteLabel,
  canLoadMore,
  onLoadMore,
  loading,
}: DataGridProps<T>) {
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

  const hasActionColumn = Boolean(onEdit || onDelete);
  const actions: { key: string; label: string | ReactNode }[] = [];
  if (onEdit) {
    actions.push({ key: 'edit', label: editLabel });
  }
  if (onDelete) {
    actions.push({ key: 'delete', label: deleteLabel });
  }

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
              {hasActionColumn && <th style={{ width: `${actions.length * 50}px` }}></th>}
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr className="bg-base-100 hover:bg-base-300" key={`${getKey(item, index)}-${index}`}>
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
                {hasActionColumn && (
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
                        }
                      }}
                      position="left"
                    ></Dropdown>

                    {/* <div className="join join-horizontal pr-0">
                      {onEdit && (
                        <button
                          className="btn btn-ghost btn-warning btn-sm join-item"
                          onClick={() => onEdit(item)}
                        >
                          <Edit size="16" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          className="btn btn-ghost btn-error btn-sm join-item"
                          onClick={() => onDelete(item)}
                        >
                          <Trash size="16" />
                        </button>
                      )}
                    </div> */}
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
