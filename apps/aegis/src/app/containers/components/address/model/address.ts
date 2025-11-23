import { AddressType } from '../../../../gql/graphql';

export type Address = {
  street: string;
  number: string;
  zipCode: string;
  city: string;
  state: string;
  countryCode: string;
  type: AddressType;
};
