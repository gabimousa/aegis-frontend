import { CustomersQuery } from '../../../../gql/graphql';

export type Customer = NonNullable<
  NonNullable<CustomersQuery['customers']>['nodes']
>[0];
