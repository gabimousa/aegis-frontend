import { graphql } from '../../../../gql';

export const supplierFragment = graphql(`
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

export const supplierAddressFragment = graphql(`
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
