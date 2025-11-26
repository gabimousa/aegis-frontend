import { ErrorLike } from '@apollo/client';
import { createContext, PropsWithChildren, useCallback, useState } from 'react';
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
  customers: CustomerModel[];
  loadingCustomers: boolean;
  loadingCustomersError?: ErrorLike;
  pageInfo?: PageInfo;
  totalCount: number;
  nextPage: () => void;
  prevPage: () => void;
  selectedCustomer?: CustomerDetailsModel;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
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

export const CustomersDataContext = createContext<CustomersContextType>({
  customers: [],
  loadingCustomers: false,
  loadingCustomersError: undefined,
  pageInfo: undefined,
  totalCount: 0,
  nextPage: () => void 0,
  prevPage: () => void 0,
  selectCustomer: () => void 0,
  searchTerm: '',
  setSearchTerm: () => void 0,
  selectedCustomer: undefined,
  loadingCustomerDetails: false,
  loadingCustomerDetailsError: undefined,
  saveCustomerDetails: async () => false,
  savingCustomerDetails: false,
  deactivate: async () => false,
  deactivatingCustomer: false,
});

export const CustomerDataProvider = ({ children }: PropsWithChildren) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | undefined>(undefined);

  // Customer list query and mutations
  const customersQuery = useCustomersQuery({
    pageSize: 10,
    searchTerm,
  });

  const customersMutations = useDeactivateCustomer({
    onCustomerDeactivated: () => {
      customersQuery.refetch();
    },
  });

  // Customer details query and mutations
  const customerDetailsQuery = useCustomerDetailsQuery({
    id: selectedCustomerId,
  });

  const customerDetailsMutations = useSaveCustomer({
    onDataSaved: (customer) => {
      // Optionally update the customer in the list or refetch
      customersQuery.refetch();
    },
  });

  // Subscriptions for real-time updates
  useCustomerSubscriptions({
    onCustomerUpdated: () => {
      customersQuery.refetch();
    },
    onCustomerRegistered: () => {
      customersQuery.refetch();
    },
    onCustomerDeactivated: () => {
      customersQuery.refetch();
    },
  });

  // Navigation handlers
  const nextPage = useCallback(() => {
    if (customersQuery.pageInfo && customersQuery.canGoNext(customersQuery.pageInfo)) {
      customersQuery.nextPage(customersQuery.pageInfo);
    }
  }, [customersQuery]);

  const prevPage = useCallback(() => {
    if (customersQuery.pageInfo && customersQuery.canGoPrevious(customersQuery.pageInfo)) {
      customersQuery.prevPage(customersQuery.pageInfo);
    }
  }, [customersQuery]);

  return (
    <CustomersDataContext.Provider
      value={{
        customers: customersQuery.customers,
        loadingCustomers: customersQuery.loading,
        loadingCustomersError: customersQuery.error,
        searchTerm,
        setSearchTerm,
        nextPage,
        prevPage,
        pageInfo: customersQuery.pageInfo,
        totalCount: customersQuery.totalCount ?? 0,
        selectCustomer: setSelectedCustomerId,
        selectedCustomer: customerDetailsQuery.customer,
        loadingCustomerDetails: customerDetailsQuery.loading,
        loadingCustomerDetailsError: customerDetailsQuery.error,
        saveCustomerDetails: customerDetailsMutations.save,
        savingCustomerDetails: customerDetailsMutations.saving,
        deactivate: customersMutations.deactivate,
        deactivatingCustomer: customersMutations.deactivatingCustomer,
      }}
    >
      {children}
    </CustomersDataContext.Provider>
  );
};

export default CustomersDataContext;
