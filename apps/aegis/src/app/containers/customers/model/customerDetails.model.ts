import { CustomerAddressFieldsFragment, CustomerFieldsFragment } from '../../../gql/graphql';
import { FragmentFields } from '../../../types/FragmentFields';

export type CustomerAddressModel = FragmentFields<CustomerAddressFieldsFragment>;

export type CustomerDetailsModel = FragmentFields<CustomerFieldsFragment> & {
  addresses: CustomerAddressModel[];
};
