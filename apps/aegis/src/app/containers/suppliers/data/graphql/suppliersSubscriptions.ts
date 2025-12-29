import { graphql } from '@aegis/shared';

export const SUPPLIERS_QUERY_KEY = (args?: { [key: string]: unknown }) => {
  return args ? ['SUPPLIERS', args] : ['SUPPLIERS'];
};
export const SUPPLIER_DETAILS_QUERY_KEY = (id?: string) => ['SUPPLIER_DETAILS', id];

export const SUPPLIER_REGISTERED_SUBSCRIPTION = graphql(`
  subscription OnSupplierRegistered {
    onSupplierRegistered {
      ...SupplierFields
    }
  }
`);

export const SUPPLIER_DETAILS_UPDATED_SUBSCRIPTION = graphql(`
  subscription OnSupplierDetailsUpdated {
    onSupplierDetailsUpdated {
      ...SupplierFields
    }
  }
`);

export const SUPPLIER_DEACTIVATED_SUBSCRIPTION = graphql(`
  subscription OnSupplierDeactivated {
    onSupplierDeactivated {
      id
    }
  }
`);
