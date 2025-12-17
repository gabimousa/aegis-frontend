import { RegisterSupplierInput, UpdateSupplierDetailsInput } from '@aegis/shared';
import { ErrorLike } from '@apollo/client';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { SupplierDetailsModel, SupplierModel } from '../model';
import {
  useDeactivateSupplier,
  useSaveSupplier,
  useSupplierDetailsQuery,
  useSuppliersQuery,
  useSupplierSubscriptions,
} from './hooks';

type SuppliersContextType = {
  list: {
    suppliers: SupplierModel[];
    loadingSuppliers: boolean;
    loadingSuppliersError?: ErrorLike;
    totalCount: number;
    load: () => void;
    loadMore: () => void;
    loadById: (id: string) => void;
    getById: (id: string) => SupplierModel | undefined;
    addOne: (item: SupplierModel) => void;
    addMany: (items: SupplierModel[]) => void;
    deleteOne: (id: string) => void;
    clear: () => void;
    canLoadMore: boolean;
    searchTerm?: string;
    setSearchTerm: (term: string | undefined) => void;
  };
  details: {
    selectedSupplier?: SupplierDetailsModel;
    selectSupplier: (id: string | undefined) => void;
    loadingSupplierDetails: boolean;
    loadingSupplierDetailsError?: ErrorLike;
    saveSupplierDetails: (
      input: RegisterSupplierInput | UpdateSupplierDetailsInput
    ) => Promise<boolean>;
    savingSupplierDetails?: boolean;
    deactivate: (supplierId: string) => Promise<boolean>;
    deactivatingSupplier: boolean;
  };
};

export const SuppliersDataContext = createContext<SuppliersContextType>({
  list: {
    suppliers: [],
    loadingSuppliers: false,
    loadingSuppliersError: undefined,
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
    selectSupplier: () => void 0,
    selectedSupplier: undefined,
    loadingSupplierDetails: false,
    loadingSupplierDetailsError: undefined,
    saveSupplierDetails: async () => false,
    savingSupplierDetails: false,
    deactivate: async () => false,
    deactivatingSupplier: false,
  },
});

export const SuppliersDataProvider = ({ children }: PropsWithChildren) => {
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | undefined>(undefined);

  // Supplier list query and mutations
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
  } = useSuppliersQuery({
    pageSize: 25,
  });

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  // Supplier details query and mutations
  const {
    entity,
    loading: loadingSupplierDetails,
    error: supplierDetailsError,
  } = useSupplierDetailsQuery({
    id: selectedSupplierId,
  });

  const { save, saving } = useSaveSupplier({
    onDataSaved: ({ id }) => {
      loadById(id);
    },
  });

  const { deactivate, deactivatingSupplier } = useDeactivateSupplier({
    onSupplierDeactivated: (id) => {
      loadById(id);
    },
  });

  // Subscriptions for real-time updates
  useSupplierSubscriptions({
    onSupplierUpdated: (supplier: SupplierModel) => {
      // Supplier updates might change name/sort order - use smart refetch
      addOne(supplier);
    },
    onSupplierRegistered: (supplier: SupplierModel) => {
      // New suppliers might appear on different pages - reset pagination
      addOne(supplier);
    },
    onSupplierDeactivated: (id) => {
      // Deactivation might empty current page
      deleteOne(id);
    },
  });

  return (
    <SuppliersDataContext.Provider
      value={{
        list: {
          suppliers: items,
          loadingSuppliers: loading,
          loadingSuppliersError: error,
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
          selectSupplier: setSelectedSupplierId,
          selectedSupplier: entity,
          loadingSupplierDetails: loadingSupplierDetails,
          loadingSupplierDetailsError: supplierDetailsError,
          saveSupplierDetails: save,
          savingSupplierDetails: saving,
          deactivate,
          deactivatingSupplier,
        },
      }}
    >
      {children}
    </SuppliersDataContext.Provider>
  );
};

export default SuppliersDataContext;
