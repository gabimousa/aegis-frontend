import { graphql } from '../../../../gql';

export const customerDetailsFragment = graphql(`
  fragment CustomerDetailsFields on Customer {
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

const customerAddressesFragment = graphql(`
  fragment CustomerAddressesFields on Customer {
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
`);
