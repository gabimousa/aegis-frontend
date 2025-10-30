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
  '\n  fragment CustomerDetailsFields on Customer {\n    id\n    code\n    name\n    website\n    email\n    phoneNumber\n    iban\n    bic\n  }\n': typeof types.CustomerDetailsFieldsFragmentDoc;
  '\n  fragment CustomerAddressesFields on Customer {\n    addresses {\n      id\n      type\n      street\n      number\n      zipCode\n      city\n      state\n      countryCode\n    }\n  }\n': typeof types.CustomerAddressesFieldsFragmentDoc;
  '\n  mutation UpdateCustomerDetails($input: UpdateCustomerDetailsInput!) {\n    updateCustomerDetails(input: $input) {\n      customer {\n        ...CustomerDetailsFields\n        ...CustomerAddressesFields\n      }\n      errors {\n        ... on ApplicationError {\n          code\n          description\n          type\n        }\n      }\n    }\n  }\n': typeof types.UpdateCustomerDetailsDocument;
  '\n  mutation RegisterCustomer($input: RegisterCustomerInput!) {\n    registerCustomer(input: $input) {\n      customer {\n        ...CustomerDetailsFields\n        ...CustomerAddressesFields\n      }\n      errors {\n        ... on ApplicationError {\n          code\n          description\n          type\n        }\n      }\n    }\n  }\n': typeof types.RegisterCustomerDocument;
  '\n  query CustomerById($id: ID!) {\n    customerById(id: $id) {\n      ...CustomerDetailsFields\n      ...CustomerAddressesFields\n    }\n  }\n': typeof types.CustomerByIdDocument;
  '\n  fragment CustomerListFields on Customer {\n    id\n    code\n    name\n    website\n    email\n    phoneNumber\n    iban\n    bic\n  }\n': typeof types.CustomerListFieldsFragmentDoc;
  '\n  query Customers(\n    $first: Int\n    $last: Int\n    $after: String\n    $before: String\n    $where: CustomerFilterInput\n    $order: [CustomerSortInput!]\n  ) {\n    customers(\n      first: $first\n      last: $last\n      after: $after\n      before: $before\n      where: $where\n      order: $order\n    ) {\n      nodes {\n        ...CustomerListFields\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      totalCount\n    }\n  }\n': typeof types.CustomersDocument;
  '\n  subscription OnCustomerRegistered {\n    onCustomerRegistered {\n      ...CustomerListFields\n    }\n  }\n': typeof types.OnCustomerRegisteredDocument;
  '\n  subscription onUpdateCustomerDetails {\n    onUpdateCustomerDetails {\n      ...CustomerListFields\n    }\n  }\n': typeof types.OnUpdateCustomerDetailsDocument;
  '\n  query Suppliers(\n    $first: Int\n    $last: Int\n    $after: String\n    $before: String\n    $where: SupplierFilterInput\n    $order: [SupplierSortInput!]\n  ) {\n    suppliers(\n      first: $first\n      last: $last\n      after: $after\n      before: $before\n      where: $where\n      order: $order\n    ) {\n      nodes {\n        id\n        code\n        name\n        website\n        email\n        phoneNumber\n        iban\n        bic\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      totalCount\n    }\n  }\n': typeof types.SuppliersDocument;
};
const documents: Documents = {
  '\n  fragment CustomerDetailsFields on Customer {\n    id\n    code\n    name\n    website\n    email\n    phoneNumber\n    iban\n    bic\n  }\n':
    types.CustomerDetailsFieldsFragmentDoc,
  '\n  fragment CustomerAddressesFields on Customer {\n    addresses {\n      id\n      type\n      street\n      number\n      zipCode\n      city\n      state\n      countryCode\n    }\n  }\n':
    types.CustomerAddressesFieldsFragmentDoc,
  '\n  mutation UpdateCustomerDetails($input: UpdateCustomerDetailsInput!) {\n    updateCustomerDetails(input: $input) {\n      customer {\n        ...CustomerDetailsFields\n        ...CustomerAddressesFields\n      }\n      errors {\n        ... on ApplicationError {\n          code\n          description\n          type\n        }\n      }\n    }\n  }\n':
    types.UpdateCustomerDetailsDocument,
  '\n  mutation RegisterCustomer($input: RegisterCustomerInput!) {\n    registerCustomer(input: $input) {\n      customer {\n        ...CustomerDetailsFields\n        ...CustomerAddressesFields\n      }\n      errors {\n        ... on ApplicationError {\n          code\n          description\n          type\n        }\n      }\n    }\n  }\n':
    types.RegisterCustomerDocument,
  '\n  query CustomerById($id: ID!) {\n    customerById(id: $id) {\n      ...CustomerDetailsFields\n      ...CustomerAddressesFields\n    }\n  }\n':
    types.CustomerByIdDocument,
  '\n  fragment CustomerListFields on Customer {\n    id\n    code\n    name\n    website\n    email\n    phoneNumber\n    iban\n    bic\n  }\n':
    types.CustomerListFieldsFragmentDoc,
  '\n  query Customers(\n    $first: Int\n    $last: Int\n    $after: String\n    $before: String\n    $where: CustomerFilterInput\n    $order: [CustomerSortInput!]\n  ) {\n    customers(\n      first: $first\n      last: $last\n      after: $after\n      before: $before\n      where: $where\n      order: $order\n    ) {\n      nodes {\n        ...CustomerListFields\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      totalCount\n    }\n  }\n':
    types.CustomersDocument,
  '\n  subscription OnCustomerRegistered {\n    onCustomerRegistered {\n      ...CustomerListFields\n    }\n  }\n':
    types.OnCustomerRegisteredDocument,
  '\n  subscription onUpdateCustomerDetails {\n    onUpdateCustomerDetails {\n      ...CustomerListFields\n    }\n  }\n':
    types.OnUpdateCustomerDetailsDocument,
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
  source: '\n  fragment CustomerDetailsFields on Customer {\n    id\n    code\n    name\n    website\n    email\n    phoneNumber\n    iban\n    bic\n  }\n'
): (typeof documents)['\n  fragment CustomerDetailsFields on Customer {\n    id\n    code\n    name\n    website\n    email\n    phoneNumber\n    iban\n    bic\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CustomerAddressesFields on Customer {\n    addresses {\n      id\n      type\n      street\n      number\n      zipCode\n      city\n      state\n      countryCode\n    }\n  }\n'
): (typeof documents)['\n  fragment CustomerAddressesFields on Customer {\n    addresses {\n      id\n      type\n      street\n      number\n      zipCode\n      city\n      state\n      countryCode\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateCustomerDetails($input: UpdateCustomerDetailsInput!) {\n    updateCustomerDetails(input: $input) {\n      customer {\n        ...CustomerDetailsFields\n        ...CustomerAddressesFields\n      }\n      errors {\n        ... on ApplicationError {\n          code\n          description\n          type\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdateCustomerDetails($input: UpdateCustomerDetailsInput!) {\n    updateCustomerDetails(input: $input) {\n      customer {\n        ...CustomerDetailsFields\n        ...CustomerAddressesFields\n      }\n      errors {\n        ... on ApplicationError {\n          code\n          description\n          type\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation RegisterCustomer($input: RegisterCustomerInput!) {\n    registerCustomer(input: $input) {\n      customer {\n        ...CustomerDetailsFields\n        ...CustomerAddressesFields\n      }\n      errors {\n        ... on ApplicationError {\n          code\n          description\n          type\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation RegisterCustomer($input: RegisterCustomerInput!) {\n    registerCustomer(input: $input) {\n      customer {\n        ...CustomerDetailsFields\n        ...CustomerAddressesFields\n      }\n      errors {\n        ... on ApplicationError {\n          code\n          description\n          type\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query CustomerById($id: ID!) {\n    customerById(id: $id) {\n      ...CustomerDetailsFields\n      ...CustomerAddressesFields\n    }\n  }\n'
): (typeof documents)['\n  query CustomerById($id: ID!) {\n    customerById(id: $id) {\n      ...CustomerDetailsFields\n      ...CustomerAddressesFields\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CustomerListFields on Customer {\n    id\n    code\n    name\n    website\n    email\n    phoneNumber\n    iban\n    bic\n  }\n'
): (typeof documents)['\n  fragment CustomerListFields on Customer {\n    id\n    code\n    name\n    website\n    email\n    phoneNumber\n    iban\n    bic\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Customers(\n    $first: Int\n    $last: Int\n    $after: String\n    $before: String\n    $where: CustomerFilterInput\n    $order: [CustomerSortInput!]\n  ) {\n    customers(\n      first: $first\n      last: $last\n      after: $after\n      before: $before\n      where: $where\n      order: $order\n    ) {\n      nodes {\n        ...CustomerListFields\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      totalCount\n    }\n  }\n'
): (typeof documents)['\n  query Customers(\n    $first: Int\n    $last: Int\n    $after: String\n    $before: String\n    $where: CustomerFilterInput\n    $order: [CustomerSortInput!]\n  ) {\n    customers(\n      first: $first\n      last: $last\n      after: $after\n      before: $before\n      where: $where\n      order: $order\n    ) {\n      nodes {\n        ...CustomerListFields\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      totalCount\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  subscription OnCustomerRegistered {\n    onCustomerRegistered {\n      ...CustomerListFields\n    }\n  }\n'
): (typeof documents)['\n  subscription OnCustomerRegistered {\n    onCustomerRegistered {\n      ...CustomerListFields\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  subscription onUpdateCustomerDetails {\n    onUpdateCustomerDetails {\n      ...CustomerListFields\n    }\n  }\n'
): (typeof documents)['\n  subscription onUpdateCustomerDetails {\n    onUpdateCustomerDetails {\n      ...CustomerListFields\n    }\n  }\n'];
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
