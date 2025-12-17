import { RegisterCustomerInput, UpdateCustomerDetailsInput } from '@aegis/shared';
import { ErrorLike } from '@apollo/client';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { CustomerDetailsModel, CustomerModel } from '../model';
import {
  useCustomerDetailsQuery,
  useCustomersQuery,
  useCustomerSubscriptions,
  useDeactivateCustomer,
  useSaveCustomer,
} from './hooks';

type CustomersContextType = {
  list: {
    customers: CustomerModel[];
    loadingCustomers: boolean;
    loadingCustomersError?: ErrorLike;
    totalCount: number;
    load: () => void;
    loadMore: () => void;
    loadById: (id: string) => void;
    getById: (id: string) => CustomerModel | undefined;
    addOne: (item: CustomerModel) => void;
    addMany: (items: CustomerModel[]) => void;
    deleteOne: (id: string) => void;
    clear: () => void;
    canLoadMore: boolean;
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
    totalCount: 0,
    load: async () => Promise.resolve([]),
    loadMore: async () => Promise.resolve([]),
    loadById: async (id: string) => undefined,
    getById: (id: string) => undefined,
    addOne: () => void 0,
    addMany: () => void 0,
    deleteOne: () => void 0,
    clear: () => void 0,
    canLoadMore: false,
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
    items,
    totalCount,
    loading,
    error,
    canLoadMore,
    getItemById,
    load,
    loadMore,
    loadById,
    addOne,
    addMany,
    clear,
    deleteOne,
    setSearchValue,
    searchValue,
  } = useCustomersQuery({
    pageSize: 25,
  });

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

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
      loadById(id);
    },
  });

  const { deactivate, deactivatingCustomer } = useDeactivateCustomer({
    onCustomerDeactivated: (id) => {
      loadById(id);
    },
  });

  // Subscriptions for real-time updates
  useCustomerSubscriptions({
    onCustomerUpdated: (customer: CustomerModel) => {
      // Customer updates might change name/sort order - use smart refetch
      addOne(customer);
    },
    onCustomerRegistered: (customer: CustomerModel) => {
      // New customers might appear on different pages - reset pagination
      addOne(customer);
    },
    onCustomerDeactivated: (id) => {
      // Deactivation might empty current page
      deleteOne(id);
    },
  });

  return (
    <CustomersDataContext.Provider
      value={{
        list: {
          customers: items,
          loadingCustomers: loading,
          loadingCustomersError: error,
          searchTerm: searchValue,
          totalCount: totalCount ?? 0,
          setSearchTerm: setSearchValue,
          loadMore,
          load,
          loadById,
          getById: getItemById,
          addOne,
          addMany,
          deleteOne,
          clear,
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
