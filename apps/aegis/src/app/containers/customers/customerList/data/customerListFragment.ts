import { graphql } from '../../../../gql';

export const customerListFragment = graphql(`
  fragment CustomerListFields on Customer {
    id
    code
    name
    website
    email
    phoneNumber
    iban
    bic
  }
`);
