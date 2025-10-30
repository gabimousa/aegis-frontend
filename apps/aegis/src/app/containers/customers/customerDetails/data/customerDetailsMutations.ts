import { graphql } from '../../../../gql';

export const updateCustomerDetailsMutation = graphql(`
  mutation UpdateCustomerDetails($input: UpdateCustomerDetailsInput!) {
    updateCustomerDetails(input: $input) {
      customer {
        ...CustomerDetailsFields
        ...CustomerAddressesFields
      }
      errors {
        ... on ApplicationError {
          code
          description
          type
        }
      }
    }
  }
`);

export const registerCustomerMutation = graphql(`
  mutation RegisterCustomer($input: RegisterCustomerInput!) {
    registerCustomer(input: $input) {
      customer {
        ...CustomerDetailsFields
        ...CustomerAddressesFields
      }
      errors {
        ... on ApplicationError {
          code
          description
          type
        }
      }
    }
  }
`);
