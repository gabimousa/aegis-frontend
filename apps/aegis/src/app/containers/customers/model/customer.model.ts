import { CustomerFieldsFragment } from '../../../gql/graphql';
import { FragmentFields } from '../../../types/FragmentFields';

export type Customer = FragmentFields<CustomerFieldsFragment>;
