import { SupplierAddressFieldsFragment, SupplierFieldsFragment } from '../../../gql/graphql';
import { FragmentFields } from '../../../types';

export type SupplierAddressModel = FragmentFields<SupplierAddressFieldsFragment>;

export type SupplierDetailsModel = FragmentFields<SupplierFieldsFragment> & {
  addresses: SupplierAddressModel[];
};
