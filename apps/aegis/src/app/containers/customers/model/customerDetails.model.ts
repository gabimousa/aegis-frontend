import { CustomerAddressFieldsFragment, CustomerFieldsFragment } from '../../../gql/graphql';
import { FragmentFields } from '../../../types';

export type CustomerAddressModel = FragmentFields<CustomerAddressFieldsFragment>;

export type CustomerDetailsModel = FragmentFields<CustomerFieldsFragment> & {
  addresses: CustomerAddressModel[];
};
