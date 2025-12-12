import { CustomerAddressFieldsFragment } from '../../../gql/graphql';
import { FragmentFields } from '../../../types';

export type Address = FragmentFields<CustomerAddressFieldsFragment>;
