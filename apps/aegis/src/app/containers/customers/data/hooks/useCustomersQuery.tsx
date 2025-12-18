import { Connection, CustomersQuery as CustomersQueryType, useListQuery } from '@aegis/shared';
import { CustomerModel } from '../../model';
import { CustomersQuery } from '../graphql/customersQueries';

export interface UseCustomersQueryProps {
  pageSize: number;
}
const connectionSelector = (data?: CustomersQueryType) =>
  data?.customers as Connection<CustomerModel>;

const idSelector = (item: CustomerModel) => item.id;

export const useCustomersQuery = ({ pageSize }: UseCustomersQueryProps) => {
  return useListQuery({
    pageSize,
    query: CustomersQuery,
    connectionSelector,
    idSelector,
  });
};
