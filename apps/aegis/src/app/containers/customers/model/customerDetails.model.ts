import { CustomerAddressFieldsFragment, CustomerFieldsFragment } from '../../../gql/graphql';
import { FragmentFields } from '../../../types/FragmentFields';

export type CustomerDetails = FragmentFields<CustomerFieldsFragment> & {
  addresses: FragmentFields<CustomerAddressFieldsFragment>[];
};
