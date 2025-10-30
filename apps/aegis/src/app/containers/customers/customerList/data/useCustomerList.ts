import { useQuery, useSubscription } from '@apollo/client/react';
import { useEffect, useState } from 'react';
import { CustomerListFieldsFragment, CustomersQueryVariables } from '../../../../gql/graphql';
import { CustomerListQuery } from './customerListQueries';
import {
  onCustomerRegisteredSubscription,
  onUpdateCustomerDetailsSubscription,
} from './customerListSubscriptions';

type Customer = CustomerListFieldsFragment;

export const useCustomerList = (pageSize: number, searchTerm?: string) => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const variables: CustomersQueryVariables = { first: pageSize };
  if (searchTerm) {
    variables.where = { name: { contains: searchTerm } };
  }

  const { data, loading, error, refetch } = useQuery(CustomerListQuery, {
    variables,
  });

  useEffect(() => {
    if (data?.customers?.nodes) {
      setCustomers(data.customers.nodes as Customer[]);
    }
  }, [data?.customers?.nodes]);

  const { data: onUpdateData } = useSubscription(onUpdateCustomerDetailsSubscription);
  const { data: onRegisterData } = useSubscription(onCustomerRegisteredSubscription);
  useEffect(() => {
    const isRegister = !!onRegisterData?.onCustomerRegistered;
    const data = onRegisterData?.onCustomerRegistered ?? onUpdateData?.onUpdateCustomerDetails;
    if (data) {
      const customer = data as Customer;
      setCustomers((prevCustomers) => {
        if (isRegister) {
          return prevCustomers.length < pageSize ? [...prevCustomers, customer] : prevCustomers;
        } else {
          if (prevCustomers.find((c) => c.id === customer.id)) {
            return prevCustomers.map((c) => (c.id === customer.id ? { ...c, ...customer } : c));
          }
          return prevCustomers;
        }
      });
    }
  }, [onUpdateData?.onUpdateCustomerDetails, onRegisterData?.onCustomerRegistered, pageSize]);

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

  return {
    customers,
    pageInfo: data?.customers?.pageInfo,
    totalCount: data?.customers?.totalCount,
    loading,
    error,
    refetch,
    nextPage,
    prevPage,
  };
};
