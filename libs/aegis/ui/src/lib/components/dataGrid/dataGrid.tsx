import { Button, Table } from 'react-bootstrap';
import { Edit, Trash } from 'tabler-icons-react';
import styles from './dataGrid.module.scss';
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
    if (canLoadMore && onLoadMore) {
      if (target.scrollHeight - target.scrollTop <= target.clientHeight + 100) {
        onLoadMore();
      }
    }
  };

  const hasActionColumn = Boolean(onEdit || onDelete);
  const numberOfActions = (onEdit ? 1 : 0) + (onDelete ? 1 : 0);

  return (
    <div className={`${styles.dataGridWrapper}  ${loading ? styles.loading : ''}`}>
      <div className={styles.tableWrapper} onScroll={onTableScroll}>
        <Table hover striped className={styles.table}>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  className="no-wrap"
                  key={`${column.field?.toString()}-${index}`}
                  style={{ minWidth: getWidth(column.width), textAlign: column.align }}
                >
                  {column.header}
                </th>
              ))}
              {hasActionColumn && (
                <th className="sticky-column" style={{ width: `${numberOfActions * 50}px` }} />
              )}
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr className={styles.row} key={`${getKey(item, index)}-${index}`}>
                {columns.map((column) => (
                  <td
                    className={styles.cell}
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
                  <td className={styles.stickyCell}>
                    {onEdit ? (
                      <Button variant="outline-primary" size="sm" onClick={() => onEdit(item)}>
                        <Edit size="16" />
                      </Button>
                    ) : null}
                    {onDelete ? (
                      <Button variant="outline-danger" size="sm" onClick={() => onDelete(item)}>
                        <Trash size="16" />
                      </Button>
                    ) : null}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
