import { graphql } from '@aegis/shared';

export const CUSTOMER_REGISTERED_SUBSCRIPTION = graphql(`
  subscription OnCustomerRegistered {
    onCustomerRegistered {
      ...CustomerFields
    }
  }
`);

export const CUSTOMER_DETAILS_UPDATED_SUBSCRIPTION = graphql(`
  subscription onCustomerDetailsUpdated {
    onCustomerDetailsUpdated {
      ...CustomerFields
    }
  }
`);

export const CUSTOMER_DEACTIVATED_SUBSCRIPTION = graphql(`
  subscription OnCustomerDeactivated {
    onCustomerDeactivated {
      id
    }
  }
`);
