import { Edit, Trash } from 'tabler-icons-react';
import { DataGridColumn } from './dataGridColumn';

export type DataGridProps<T> = {
  keyAccessor: keyof T | ((item: T) => string | number);
  columns: DataGridColumn<T>[];
  data: T[] | undefined;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
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
  const numberOfActions = (onEdit ? 1 : 0) + (onDelete ? 1 : 0);

  return (
    <div className="relative h-full w-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-base-100 bg-opacity-80 z-10">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      )}
      <div className="h-full w-full overflow-x-auto" onScroll={onTableScroll}>
        <table className="isolate table w-full table-pin-rows table-pin-cols">
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
              {hasActionColumn && <th style={{ width: `${numberOfActions * 50}px` }}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr className="hover" key={`${getKey(item, index)}-${index}`}>
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
                  <th className="pl-0 shadow-[1px_0_0_0_var(--color-base-100)]">
                    <div className="join join-horizontal pr-0">
                      {onEdit && (
                        <button
                          className="btn btn-ghost btn-warning btn-xs join-item"
                          onClick={() => onEdit(item)}
                        >
                          <Edit size="16" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          className="btn btn-ghost btn-error btn-xs join-item"
                          onClick={() => onDelete(item)}
                        >
                          <Trash size="16" />
                        </button>
                      )}
                    </div>
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
