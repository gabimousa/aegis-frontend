import { graphql } from '@aegis/shared';

export const customerFragment = graphql(`
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

export const customerAddressFragment = graphql(`
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
