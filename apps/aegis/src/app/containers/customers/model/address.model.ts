import { CustomerAddressFieldsFragment } from '../../../gql/graphql';
import { FragmentFields } from '../../../types/FragmentFields';

export type Address = FragmentFields<CustomerAddressFieldsFragment>;
