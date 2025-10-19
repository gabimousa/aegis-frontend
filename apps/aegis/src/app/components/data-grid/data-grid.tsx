import { Table } from 'react-bootstrap';
import { DataGridColumn } from './data-grid-column';

export type DataGridProps<T> = {
  keyAccessor: keyof T | ((item: T) => string | number);
  columns: DataGridColumn<T>[];
  data: T[] | undefined;
};

function DataGrid<T>({ columns, data, keyAccessor }: DataGridProps<T>) {
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

  return (
    <Table responsive hover striped>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th
              className="no-wrap"
              key={`${column.field?.toString()}-${index}`}
              style={{ width: getWidth(column.width), textAlign: column.align }}
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => (
          <tr key={`${getKey(item, index)}-${index}`}>
            {columns.map((column) => (
              <td
                className="no-wrap"
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
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
export default DataGrid;
