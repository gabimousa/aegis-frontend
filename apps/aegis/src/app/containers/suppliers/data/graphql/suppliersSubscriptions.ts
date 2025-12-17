import { graphql } from '@aegis/shared';

export const onSupplierRegisteredSubscription = graphql(`
  subscription OnSupplierRegistered {
    onSupplierRegistered {
      ...SupplierFields
    }
  }
`);

export const onSupplierDetailsUpdatedSubscription = graphql(`
  subscription OnSupplierDetailsUpdated {
    onSupplierDetailsUpdated {
      ...SupplierFields
    }
  }
`);

export const onSupplierDeactivatedSubscription = graphql(`
  subscription OnSupplierDeactivated {
    onSupplierDeactivated {
      id
    }
  }
`);
