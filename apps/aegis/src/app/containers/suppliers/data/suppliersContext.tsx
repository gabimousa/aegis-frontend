import { RegisterSupplierInput, UpdateSupplierDetailsInput } from '@aegis/shared';
import { ErrorLike } from '@apollo/client';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
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

const SuppliersDataContext = createContext<SuppliersContextType | null>(null);

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
    onSupplierDetailsUpdated: (supplier: SupplierModel) => {
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

export const useSuppliers = () => {
  const context = useContext(SuppliersDataContext);
  if (!context) {
    throw new Error('useSuppliers must be used within a SuppliersDataProvider');
  }
  return context;
};
