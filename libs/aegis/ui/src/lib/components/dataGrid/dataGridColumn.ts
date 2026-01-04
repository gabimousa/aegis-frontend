import { ReactElement } from 'react';

export type DataGridColumn<T> = {
  header: string | ReactElement;
  field?: keyof T;
  width?: number | string;
  cellTemplate?: (data: T) => ReactElement;
  align?: 'left' | 'center' | 'right';
};
