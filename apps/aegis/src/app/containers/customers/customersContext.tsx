import { ErrorLike } from '@apollo/client';
import { createContext, PropsWithChildren, useState } from 'react';
import { PageInfo, RegisterCustomerInput, UpdateCustomerDetailsInput } from '../../gql/graphql';
import {
  useCustomerDetailsQuery,
  useCustomersQuery,
  useCustomerSubscriptions,
  useDeactivateCustomer,
  useSaveCustomer,
} from './data/hooks';
import { CustomerModel } from './model/customer.model';
import { CustomerDetailsModel } from './model/customerDetails.model';

type CustomersContextType = {
  list: {
    customers: CustomerModel[];
    loadingCustomers: boolean;
    loadingCustomersError?: ErrorLike;
    pageInfo?: PageInfo;
    totalCount: number;
    loadMore: (pageInfo: PageInfo) => void;
    canLoadMore: (pageInfo: PageInfo) => boolean;
    searchTerm?: string;
    setSearchTerm: (term: string | undefined) => void;
  };
  details: {
    selectedCustomer?: CustomerDetailsModel;
    selectCustomer: (id: string | undefined) => void;
    loadingCustomerDetails: boolean;
    loadingCustomerDetailsError?: ErrorLike;
    saveCustomerDetails: (
      input: RegisterCustomerInput | UpdateCustomerDetailsInput
    ) => Promise<boolean>;
    savingCustomerDetails?: boolean;
    deactivate: (customerId: string) => Promise<boolean>;
    deactivatingCustomer: boolean;
  };
};

export const CustomersDataContext = createContext<CustomersContextType>({
  list: {
    customers: [],
    loadingCustomers: false,
    loadingCustomersError: undefined,
    pageInfo: undefined,
    totalCount: 0,
    loadMore: (pageInfo: PageInfo) => void 0,
    canLoadMore: (pageInfo: PageInfo) => false,
    searchTerm: '',
    setSearchTerm: () => void 0,
  },
  details: {
    selectCustomer: () => void 0,
    selectedCustomer: undefined,
    loadingCustomerDetails: false,
    loadingCustomerDetailsError: undefined,
    saveCustomerDetails: async () => false,
    savingCustomerDetails: false,
    deactivate: async () => false,
    deactivatingCustomer: false,
  },
});

export const CustomerDataProvider = ({ children }: PropsWithChildren) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | undefined>(undefined);

  // Customer list query and mutations
  const {
    entities,
    pageInfo,
    loading,
    error,
    canLoadMore,
    loadMore,
    fetchSingleEntity,
    removeLocalEntity,
    searchTerm,
    setSearchTerm,
    totalCount,
  } = useCustomersQuery({
    pageSize: 10,
  });

  // Customer details query and mutations
  const {
    entity,
    loading: loadingCustomerDetails,
    error: customerDetailsError,
  } = useCustomerDetailsQuery({
    id: selectedCustomerId,
  });

  const { save, saving } = useSaveCustomer({
    onDataSaved: ({ id }) => {
      fetchSingleEntity(id);
    },
  });

  const { deactivate, deactivatingCustomer } = useDeactivateCustomer({
    onCustomerDeactivated: (id) => {
      removeLocalEntity(id);
    },
  });

  // Subscriptions for real-time updates
  useCustomerSubscriptions({
    onCustomerUpdated: ({ id }) => {
      // Customer updates might change name/sort order - use smart refetch
      fetchSingleEntity(id);
    },
    onCustomerRegistered: ({ id }) => {
      // New customers might appear on different pages - reset pagination
      fetchSingleEntity(id);
    },
    onCustomerDeactivated: (id) => {
      // Deactivation might empty current page
      removeLocalEntity(id);
    },
  });

  return (
    <CustomersDataContext.Provider
      value={{
        list: {
          customers: entities,
          loadingCustomers: loading,
          loadingCustomersError: error,
          searchTerm,
          pageInfo: pageInfo,
          totalCount: totalCount ?? 0,
          setSearchTerm,
          loadMore,
          canLoadMore,
        },
        details: {
          selectCustomer: setSelectedCustomerId,
          selectedCustomer: entity,
          loadingCustomerDetails: loadingCustomerDetails,
          loadingCustomerDetailsError: customerDetailsError,
          saveCustomerDetails: save,
          savingCustomerDetails: saving,
          deactivate,
          deactivatingCustomer,
        },
      }}
    >
      {children}
    </CustomersDataContext.Provider>
  );
};

export default CustomersDataContext;
