import { graphql } from '../../../../gql';

export const CustomerDetailsQuery = graphql(`
  query CustomerById($id: ID!) {
    customerById(id: $id) {
      ...CustomerDetailsFields
      ...CustomerAddressesFields
    }
  }
`);
