import { graphql } from '../../../../gql';

export const onCustomerRegisteredSubscription = graphql(`
  subscription OnCustomerRegistered {
    onCustomerRegistered {
      ...CustomerListFields
    }
  }
`);

export const onUpdateCustomerDetailsSubscription = graphql(`
  subscription onUpdateCustomerDetails {
    onUpdateCustomerDetails {
      ...CustomerListFields
    }
  }
`);
