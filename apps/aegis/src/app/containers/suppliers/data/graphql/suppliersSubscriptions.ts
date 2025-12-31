import { graphql } from '@aegis/shared';

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
