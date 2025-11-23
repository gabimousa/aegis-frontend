import { useMutation, useQuery } from '@apollo/client/react';
import { useState } from 'react';
import { CustomersQueryVariables } from '../../../../gql/graphql';
import { CustomerModel } from '../../model/customer.model';
import { deactivateCustomerMutation } from '../graphql/customersMutations';
import { CustomersQuery } from '../graphql/customersQueries';

type useCustomersDataProps = {
  pageSize: number;
  searchTerm?: string;
  onCustomerDeactivated?: (customerId: string) => void;
};

export const useCustomersData = ({
  pageSize,
  searchTerm,
  onCustomerDeactivated,
}: useCustomersDataProps) => {
  const variables: CustomersQueryVariables = { first: pageSize };
  if (searchTerm) {
    variables.where = { name: { contains: searchTerm } };
  }

  const { data, loading, error, refetch } = useQuery(CustomersQuery, {
    variables,
  });

  const [deactivatingCustomer, setDeactivatingCustomer] = useState(false);
  const [deactivateCustomer] = useMutation(deactivateCustomerMutation, {});

  const nextPage = () => {
    if (data?.customers?.pageInfo?.hasNextPage) {
      refetch({
        first: pageSize,
        last: null,
        before: null,
        after: data.customers.pageInfo.endCursor,
      });
    }
  };

  const prevPage = () => {
    if (data?.customers?.pageInfo?.hasPreviousPage) {
      refetch({
        first: null,
        last: pageSize,
        before: data.customers.pageInfo.startCursor,
        after: null,
      });
    }
  };

  const refetchCurrentPage = () => {
    refetch();
  };

  const deactivate = async (customerId: string): Promise<boolean> => {
    setDeactivatingCustomer(true);
    const result = await deactivateCustomer({ variables: { input: { id: customerId } } });
    setDeactivatingCustomer(false);
    if (result.data?.deactivateCustomer.errors?.length) {
      throw result.data.deactivateCustomer.errors;
    }

    onCustomerDeactivated?.(customerId);
    return true;
  };

  return {
    customers: (data?.customers?.nodes as CustomerModel[]) || [],
    pageInfo: data?.customers?.pageInfo,
    totalCount: data?.customers?.totalCount,
    loading,
    error,
    refetchCurrentPage,
    nextPage,
    prevPage,
    deactivate,
    deactivatingCustomer,
  };
};
