import { graphql } from '../../../../gql';

export const registerCustomerMutation = graphql(`
  mutation registerCustomer($input: RegisterCustomerInput!) {
    registerCustomer(input: $input) {
      customer {
        ...CustomerFields
        addresses {
          ...CustomerAddressFields
        }
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

export const updateCustomerDetailsMutation = graphql(`
  mutation updateCustomerDetails($input: UpdateCustomerDetailsInput!) {
    updateCustomerDetails(input: $input) {
      customer {
        ...CustomerFields
        addresses {
          ...CustomerAddressFields
        }
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

export const deactivateCustomerMutation = graphql(`
  mutation deactivateCustomer($input: DeactivateCustomerInput!) {
    deactivateCustomer(input: $input) {
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
