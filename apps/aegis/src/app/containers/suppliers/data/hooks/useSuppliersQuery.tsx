import { Connection, SuppliersQuery as SuppliersQueryType, useListQuery } from '@aegis/shared';
import { SupplierModel } from '../../model';
import { SUPPLIERS_QUERY } from '../graphql/suppliersQueries';

export interface UseSuppliersQueryProps {
  pageSize: number;
}
const connectionSelector = (data?: SuppliersQueryType) =>
  data?.suppliers as Connection<SupplierModel>;
const idSelector = (item: SupplierModel) => item.id;

export const useSuppliersQuery = ({ pageSize }: UseSuppliersQueryProps) => {
  return useListQuery({
    pageSize,
    query: SUPPLIERS_QUERY,
    connectionSelector,
    idSelector,
  });
};
