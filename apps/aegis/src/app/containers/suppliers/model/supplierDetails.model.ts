import { SupplierFieldsFragment } from '@aegis/shared';
import { FragmentFields } from '@aegis/shared';
import { AddressModel } from './address.model';

export type SupplierDetailsModel = FragmentFields<SupplierFieldsFragment> & {
  addresses: AddressModel[];
};
