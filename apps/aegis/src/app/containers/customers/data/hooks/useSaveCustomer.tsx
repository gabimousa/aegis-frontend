import { useSaveEntity } from '@aegis/shared';
import type { ErrorLike } from '@apollo/client';
import { CustomerDetailsModel } from '../../model';
import {
  registerCustomerMutation,
  updateCustomerDetailsMutation,
} from '../graphql/customersMutations';

export interface UseSaveCustomerProps {
  onDataSaved?: (customer: CustomerDetailsModel) => void;
  onError?: (error: ErrorLike | Error) => void;
}

export const useSaveCustomer = ({ onDataSaved, onError }: UseSaveCustomerProps = {}) => {
  return useSaveEntity({
    onDataSaved,
    onError,
    createMutation: registerCustomerMutation,
    updateMutation: updateCustomerDetailsMutation,
    updateResultSelector: (data) => data?.updateCustomerDetails,
    createResultSelector: (data) => data?.registerCustomer,
    saveResultEntitySelector: (data) =>
      data
        ? (('updateCustomerDetails' in data
            ? data?.updateCustomerDetails?.customer
            : data?.registerCustomer?.customer) as CustomerDetailsModel)
        : undefined,
  });
};
