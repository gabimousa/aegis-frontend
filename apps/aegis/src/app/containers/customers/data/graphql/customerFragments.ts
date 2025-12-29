import { graphql } from '@aegis/shared';

export const CUSTOMER_FRAGMENT = graphql(`
  fragment CustomerFields on Customer {
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

export const CUSTOMER_ADDRESS_FRAGMENT = graphql(`
  fragment CustomerAddressFields on Address {
    id
    type
    street
    number
    zipCode
    city
    state
    countryCode
  }
`);
