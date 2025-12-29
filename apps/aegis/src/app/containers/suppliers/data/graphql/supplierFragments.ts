import { graphql } from '@aegis/shared';

export const SUPPLIER_FRAGMENT = graphql(`
  fragment SupplierFields on Supplier {
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

export const SUPPLIER_ADDRESS_FRAGMENT = graphql(`
  fragment SupplierAddressFields on Address {
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
