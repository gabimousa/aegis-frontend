import { graphql } from '../../../../gql';

export const CustomerDetailsQuery = graphql(`
  query CustomerById($id: ID!) {
    customerById(id: $id) {
      id
      code
      name
      website
      email
      phoneNumber
      iban
      bic
      addresses {
        id
        type
        street
        number
        zipCode
        city
        state
        countryCode
      }
    }
  }
`);
