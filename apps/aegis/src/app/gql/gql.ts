/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  '\n  fragment CustomerFields on Customer {\n    id\n    code\n    name\n    website\n    email\n    phoneNumber\n    iban\n    bic\n  }\n': typeof types.CustomerFieldsFragmentDoc;
  '\n  fragment CustomerAddressFields on Address {\n    id\n    type\n    street\n    number\n    zipCode\n    city\n    state\n    countryCode\n  }\n': typeof types.CustomerAddressFieldsFragmentDoc;
  '\n  mutation registerCustomer($input: RegisterCustomerInput!) {\n    registerCustomer(input: $input) {\n      customer {\n        ...CustomerFields\n        addresses {\n          ...CustomerAddressFields\n        }\n      }\n      errors {\n        ... on ApplicationError {\n          code\n          description\n          type\n        }\n      }\n    }\n  }\n': typeof types.RegisterCustomerDocument;
  '\n  mutation updateCustomerDetails($input: UpdateCustomerDetailsInput!) {\n    updateCustomerDetails(input: $input) {\n      customer {\n        ...CustomerFields\n        addresses {\n          ...CustomerAddressFields\n        }\n      }\n      errors {\n        ... on ApplicationError {\n          code\n          description\n          type\n        }\n      }\n    }\n  }\n': typeof types.UpdateCustomerDetailsDocument;
  '\n  mutation deactivateCustomer($input: DeactivateCustomerInput!) {\n    deactivateCustomer(input: $input) {\n      errors {\n        ... on ApplicationError {\n          code\n          description\n          type\n        }\n      }\n    }\n  }\n': typeof types.DeactivateCustomerDocument;
  '\n  query customers(\n    $first: Int\n    $last: Int\n    $after: String\n    $before: String\n    $where: CustomerFilterInput\n    $order: [CustomerSortInput!]\n  ) {\n    customers(\n      first: $first\n      last: $last\n      after: $after\n      before: $before\n      where: $where\n      order: $order\n    ) {\n      nodes {\n        ...CustomerFields\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      totalCount\n    }\n  }\n': typeof types.CustomersDocument;
  '\n  query CustomerDetails($id: ID!) {\n    customerById(id: $id) {\n      ...CustomerFields\n      addresses {\n        ...CustomerAddressFields\n      }\n    }\n  }\n': typeof types.CustomerDetailsDocument;
  '\n  subscription OnCustomerRegistered {\n    onCustomerRegistered {\n      ...CustomerFields\n    }\n  }\n': typeof types.OnCustomerRegisteredDocument;
  '\n  subscription onCustomerDetailsUpdated {\n    onCustomerDetailsUpdated {\n      ...CustomerFields\n    }\n  }\n': typeof types.OnCustomerDetailsUpdatedDocument;
  '\n  subscription OnCustomerDeactivated {\n    onCustomerDeactivated\n  }\n': typeof types.OnCustomerDeactivatedDocument;
  '\n  query Suppliers(\n    $first: Int\n    $last: Int\n    $after: String\n    $before: String\n    $where: SupplierFilterInput\n    $order: [SupplierSortInput!]\n  ) {\n    suppliers(\n      first: $first\n      last: $last\n      after: $after\n      before: $before\n      where: $where\n      order: $order\n    ) {\n      nodes {\n        id\n        code\n        name\n        website\n        email\n        phoneNumber\n        iban\n        bic\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      totalCount\n    }\n  }\n': typeof types.SuppliersDocument;
};
const documents: Documents = {
  '\n  fragment CustomerFields on Customer {\n    id\n    code\n    name\n    website\n    email\n    phoneNumber\n    iban\n    bic\n  }\n':
    types.CustomerFieldsFragmentDoc,
  '\n  fragment CustomerAddressFields on Address {\n    id\n    type\n    street\n    number\n    zipCode\n    city\n    state\n    countryCode\n  }\n':
    types.CustomerAddressFieldsFragmentDoc,
  '\n  mutation registerCustomer($input: RegisterCustomerInput!) {\n    registerCustomer(input: $input) {\n      customer {\n        ...CustomerFields\n        addresses {\n          ...CustomerAddressFields\n        }\n      }\n      errors {\n        ... on ApplicationError {\n          code\n          description\n          type\n        }\n      }\n    }\n  }\n':
    types.RegisterCustomerDocument,
  '\n  mutation updateCustomerDetails($input: UpdateCustomerDetailsInput!) {\n    updateCustomerDetails(input: $input) {\n      customer {\n        ...CustomerFields\n        addresses {\n          ...CustomerAddressFields\n        }\n      }\n      errors {\n        ... on ApplicationError {\n          code\n          description\n          type\n        }\n      }\n    }\n  }\n':
    types.UpdateCustomerDetailsDocument,
  '\n  mutation deactivateCustomer($input: DeactivateCustomerInput!) {\n    deactivateCustomer(input: $input) {\n      errors {\n        ... on ApplicationError {\n          code\n          description\n          type\n        }\n      }\n    }\n  }\n':
    types.DeactivateCustomerDocument,
  '\n  query customers(\n    $first: Int\n    $last: Int\n    $after: String\n    $before: String\n    $where: CustomerFilterInput\n    $order: [CustomerSortInput!]\n  ) {\n    customers(\n      first: $first\n      last: $last\n      after: $after\n      before: $before\n      where: $where\n      order: $order\n    ) {\n      nodes {\n        ...CustomerFields\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      totalCount\n    }\n  }\n':
    types.CustomersDocument,
  '\n  query CustomerDetails($id: ID!) {\n    customerById(id: $id) {\n      ...CustomerFields\n      addresses {\n        ...CustomerAddressFields\n      }\n    }\n  }\n':
    types.CustomerDetailsDocument,
  '\n  subscription OnCustomerRegistered {\n    onCustomerRegistered {\n      ...CustomerFields\n    }\n  }\n':
    types.OnCustomerRegisteredDocument,
  '\n  subscription onCustomerDetailsUpdated {\n    onCustomerDetailsUpdated {\n      ...CustomerFields\n    }\n  }\n':
    types.OnCustomerDetailsUpdatedDocument,
  '\n  subscription OnCustomerDeactivated {\n    onCustomerDeactivated\n  }\n':
    types.OnCustomerDeactivatedDocument,
  '\n  query Suppliers(\n    $first: Int\n    $last: Int\n    $after: String\n    $before: String\n    $where: SupplierFilterInput\n    $order: [SupplierSortInput!]\n  ) {\n    suppliers(\n      first: $first\n      last: $last\n      after: $after\n      before: $before\n      where: $where\n      order: $order\n    ) {\n      nodes {\n        id\n        code\n        name\n        website\n        email\n        phoneNumber\n        iban\n        bic\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      totalCount\n    }\n  }\n':
    types.SuppliersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CustomerFields on Customer {\n    id\n    code\n    name\n    website\n    email\n    phoneNumber\n    iban\n    bic\n  }\n'
): (typeof documents)['\n  fragment CustomerFields on Customer {\n    id\n    code\n    name\n    website\n    email\n    phoneNumber\n    iban\n    bic\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CustomerAddressFields on Address {\n    id\n    type\n    street\n    number\n    zipCode\n    city\n    state\n    countryCode\n  }\n'
): (typeof documents)['\n  fragment CustomerAddressFields on Address {\n    id\n    type\n    street\n    number\n    zipCode\n    city\n    state\n    countryCode\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation registerCustomer($input: RegisterCustomerInput!) {\n    registerCustomer(input: $input) {\n      customer {\n        ...CustomerFields\n        addresses {\n          ...CustomerAddressFields\n        }\n      }\n      errors {\n        ... on ApplicationError {\n          code\n          description\n          type\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation registerCustomer($input: RegisterCustomerInput!) {\n    registerCustomer(input: $input) {\n      customer {\n        ...CustomerFields\n        addresses {\n          ...CustomerAddressFields\n        }\n      }\n      errors {\n        ... on ApplicationError {\n          code\n          description\n          type\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation updateCustomerDetails($input: UpdateCustomerDetailsInput!) {\n    updateCustomerDetails(input: $input) {\n      customer {\n        ...CustomerFields\n        addresses {\n          ...CustomerAddressFields\n        }\n      }\n      errors {\n        ... on ApplicationError {\n          code\n          description\n          type\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation updateCustomerDetails($input: UpdateCustomerDetailsInput!) {\n    updateCustomerDetails(input: $input) {\n      customer {\n        ...CustomerFields\n        addresses {\n          ...CustomerAddressFields\n        }\n      }\n      errors {\n        ... on ApplicationError {\n          code\n          description\n          type\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation deactivateCustomer($input: DeactivateCustomerInput!) {\n    deactivateCustomer(input: $input) {\n      errors {\n        ... on ApplicationError {\n          code\n          description\n          type\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation deactivateCustomer($input: DeactivateCustomerInput!) {\n    deactivateCustomer(input: $input) {\n      errors {\n        ... on ApplicationError {\n          code\n          description\n          type\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query customers(\n    $first: Int\n    $last: Int\n    $after: String\n    $before: String\n    $where: CustomerFilterInput\n    $order: [CustomerSortInput!]\n  ) {\n    customers(\n      first: $first\n      last: $last\n      after: $after\n      before: $before\n      where: $where\n      order: $order\n    ) {\n      nodes {\n        ...CustomerFields\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      totalCount\n    }\n  }\n'
): (typeof documents)['\n  query customers(\n    $first: Int\n    $last: Int\n    $after: String\n    $before: String\n    $where: CustomerFilterInput\n    $order: [CustomerSortInput!]\n  ) {\n    customers(\n      first: $first\n      last: $last\n      after: $after\n      before: $before\n      where: $where\n      order: $order\n    ) {\n      nodes {\n        ...CustomerFields\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      totalCount\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query CustomerDetails($id: ID!) {\n    customerById(id: $id) {\n      ...CustomerFields\n      addresses {\n        ...CustomerAddressFields\n      }\n    }\n  }\n'
): (typeof documents)['\n  query CustomerDetails($id: ID!) {\n    customerById(id: $id) {\n      ...CustomerFields\n      addresses {\n        ...CustomerAddressFields\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  subscription OnCustomerRegistered {\n    onCustomerRegistered {\n      ...CustomerFields\n    }\n  }\n'
): (typeof documents)['\n  subscription OnCustomerRegistered {\n    onCustomerRegistered {\n      ...CustomerFields\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  subscription onCustomerDetailsUpdated {\n    onCustomerDetailsUpdated {\n      ...CustomerFields\n    }\n  }\n'
): (typeof documents)['\n  subscription onCustomerDetailsUpdated {\n    onCustomerDetailsUpdated {\n      ...CustomerFields\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  subscription OnCustomerDeactivated {\n    onCustomerDeactivated\n  }\n'
): (typeof documents)['\n  subscription OnCustomerDeactivated {\n    onCustomerDeactivated\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Suppliers(\n    $first: Int\n    $last: Int\n    $after: String\n    $before: String\n    $where: SupplierFilterInput\n    $order: [SupplierSortInput!]\n  ) {\n    suppliers(\n      first: $first\n      last: $last\n      after: $after\n      before: $before\n      where: $where\n      order: $order\n    ) {\n      nodes {\n        id\n        code\n        name\n        website\n        email\n        phoneNumber\n        iban\n        bic\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      totalCount\n    }\n  }\n'
): (typeof documents)['\n  query Suppliers(\n    $first: Int\n    $last: Int\n    $after: String\n    $before: String\n    $where: SupplierFilterInput\n    $order: [SupplierSortInput!]\n  ) {\n    suppliers(\n      first: $first\n      last: $last\n      after: $after\n      before: $before\n      where: $where\n      order: $order\n    ) {\n      nodes {\n        id\n        code\n        name\n        website\n        email\n        phoneNumber\n        iban\n        bic\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      totalCount\n    }\n  }\n'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
