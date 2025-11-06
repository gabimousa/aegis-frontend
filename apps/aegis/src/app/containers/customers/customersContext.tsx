import { ErrorLike } from '@apollo/client';
import { createContext, PropsWithChildren, useState } from 'react';
import {
  ApplicationError,
  PageInfo,
  RegisterCustomerInput,
  UpdateCustomerDetailsInput,
} from '../../gql/graphql';
import { useCustomerDetailsData } from './data/hooks/useCustomerDetailsData';
import { useCustomersData } from './data/hooks/useCustomersData';
import { useCustomerSubscriptions } from './data/hooks/useCustomerSubscriptions';
import { Customer } from './model/customer';
import { CustomerDetails } from './model/customerDetails';

type CustomersContextType = {
  customers: Customer[];
  loadingCustomers: boolean;
  loadingCustomersError?: ErrorLike;
  pageInfo?: PageInfo;
  totalCount: number;
  nextPage: () => void;
  prevPage: () => void;
  selectedCustomer?: CustomerDetails;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectCustomer: (id: string | undefined) => void;
  loadingCustomerDetails: boolean;
  loadingCustomerDetailsError?: ErrorLike;
  saveCustomerDetails: (
    input: RegisterCustomerInput | UpdateCustomerDetailsInput
  ) => Promise<boolean>;
  savingCustomerDetails?: boolean;
  customerDetailsSaveErrors?: Record<keyof ApplicationError, ApplicationError[]>;
  deactivate: (customerId: string) => Promise<boolean>;
  deactivatingCustomer: boolean;
  deactivatingCustomerErrors?: ApplicationError[];
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
  customerDetailsSaveErrors: undefined,
  deactivate: async () => false,
  deactivatingCustomer: false,
  deactivatingCustomerErrors: undefined,
});

export const CustomerDataProvider = ({ children }: PropsWithChildren) => {
  const [searchTerm, setSearchTerm] = useState('');
  const {
    customers,
    pageInfo,
    totalCount,
    loading: loadingCustomers,
    error: loadingCustomersError,
    refetchCurrentPage,
    nextPage,
    prevPage,
    deactivate,
    deactivatingCustomer,
    deactivatingCustomerErrors,
  } = useCustomersData({
    pageSize: 10,
    searchTerm,
  });

  useCustomerSubscriptions({
    onCustomerUpdated: () => {
      refetchCurrentPage();
    },
    onCustomerRegistered: (customer) => {
      refetchCurrentPage();
    },
    onCustomerDeactivated: () => {
      refetchCurrentPage();
    },
  });

  const [selectedCustomerId, setSelectedCustomerId] = useState<string | undefined>(undefined);

  const {
    customer: selectedCustomer,
    loading: loadingCustomerDetails,
    error: loadingCustomerDetailsError,
    save: saveCustomerDetails,
    saving: savingCustomerDetails,
    saveErrors: customerDetailsSaveErrors,
  } = useCustomerDetailsData({ id: selectedCustomerId });

  return (
    <CustomersDataContext.Provider
      value={{
        customers,
        loadingCustomers,
        loadingCustomersError,
        searchTerm,
        setSearchTerm,
        nextPage,
        prevPage,
        pageInfo,
        totalCount: totalCount ?? 0,
        selectCustomer: setSelectedCustomerId,
        selectedCustomer,
        loadingCustomerDetails,
        loadingCustomerDetailsError,
        saveCustomerDetails,
        savingCustomerDetails,
        customerDetailsSaveErrors,
        deactivate,
        deactivatingCustomer,
        deactivatingCustomerErrors,
      }}
    >
      {children}
    </CustomersDataContext.Provider>
  );
};

export default CustomersDataContext;
