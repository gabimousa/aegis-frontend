import { graphql } from '@aegis/shared';

export const registerSupplierMutation = graphql(`
  mutation registerSupplier($input: RegisterSupplierInput!) {
    registerSupplier(input: $input) {
      supplier {
        ...SupplierFields
        addresses {
          ...SupplierAddressFields
        }
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

export const updateSupplierDetailsMutation = graphql(`
  mutation updateSupplierDetails($input: UpdateSupplierDetailsInput!) {
    updateSupplierDetails(input: $input) {
      supplier {
        ...SupplierFields
        addresses {
          ...SupplierAddressFields
        }
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

export const deactivateSupplierMutation = graphql(`
  mutation deactivateSupplier($input: DeactivateSupplierInput!) {
    deactivateSupplier(input: $input) {
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
