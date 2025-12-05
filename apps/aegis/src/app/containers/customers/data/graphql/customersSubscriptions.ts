import { graphql } from '../../../../gql';

export const onCustomerRegisteredSubscription = graphql(`
  subscription OnCustomerRegistered {
    onCustomerRegistered {
      ...CustomerFields
    }
  }
`);

export const onCustomerDetailsUpdatedSubscription = graphql(`
  subscription onCustomerDetailsUpdated {
    onCustomerDetailsUpdated {
      ...CustomerFields
    }
  }
`);

export const onCustomerDeactivatedSubscription = graphql(`
  subscription OnCustomerDeactivated {
    onCustomerDeactivated {
      id
    }
  }
`);
