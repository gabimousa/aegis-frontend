import { CustomerByIdQuery } from '../../../../gql/graphql';

export type Address = NonNullable<
  CustomerByIdQuery['customerById']
>['addresses'][0];

// export type Address = {
//   id: string;
//   type: 'DELIVERY' | 'MAILING' | 'VISITING';
//   street: string;
//   number: string;
//   zipCode: string;
//   city: string;
//   state: string;
//   countryCode: string;
// };
