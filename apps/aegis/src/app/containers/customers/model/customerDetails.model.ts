import { CustomerFieldsFragment } from '@aegis/shared';
import { FragmentFields } from '@aegis/shared';
import { AddressModel } from './address.model';

export type CustomerDetailsModel = FragmentFields<CustomerFieldsFragment> & {
  addresses: AddressModel[];
};
