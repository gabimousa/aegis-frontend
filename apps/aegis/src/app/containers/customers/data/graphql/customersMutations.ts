import { graphql } from '@aegis/shared';

export const REGISTER_CUSTOMER_MUTATION = graphql(`
  mutation registerCustomer($input: RegisterCustomerInput!) {
    registerCustomer(input: $input) {
      customer {
        ...CustomerFields
      }
      errors {
        ... on ApplicationError {
          code
          description
          type
          fieldName
          message
        }
      }
    }
  }
`);

export const UPDATE_CUSTOMER_DETAILS_MUTATION = graphql(`
  mutation updateCustomerDetails($input: UpdateCustomerDetailsInput!) {
    updateCustomerDetails(input: $input) {
      customer {
        ...CustomerFields
      }
      errors {
        ... on ApplicationError {
          code
          description
          type
          fieldName
          message
        }
      }
    }
  }
`);

export const DEACTIVATE_CUSTOMER_MUTATION = graphql(`
  mutation deactivateCustomer($input: DeactivateCustomerInput!) {
    deactivateCustomer(input: $input) {
      boolean
      errors {
        ... on ApplicationError {
          code
          description
          type
          fieldName
          message
        }
      }
    }
  }
`);
