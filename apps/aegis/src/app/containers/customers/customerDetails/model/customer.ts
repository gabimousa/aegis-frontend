import { Address } from './address';
import { CustomerByIdQuery } from '../../../../gql/graphql';
export type CustomerDetails = CustomerByIdQuery['customerById'];

// export type Customer = {
//   id: string;
//   code: string;
//   name: string;
//   website?: string | null;
//   email?: string | null;
//   phoneNumber?: string | null;
//   iban?: string | null;
//   bic?: string | null;
//   addresses: Address[];
// };
