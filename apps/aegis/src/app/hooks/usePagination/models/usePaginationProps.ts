import { OperationVariables } from '@apollo/client';

export interface UsePaginationProps {
  pageSize: number;
  initialVariables?: OperationVariables;
}
