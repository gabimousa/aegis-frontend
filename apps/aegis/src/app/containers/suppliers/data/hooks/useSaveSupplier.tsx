import { useSaveEntity } from '@aegis/shared';
import type { ErrorLike } from '@apollo/client';
import { SupplierDetailsModel } from '../../model';
import {
  registerSupplierMutation,
  updateSupplierDetailsMutation,
} from '../graphql/suppliersMutations';
export interface UseSaveSupplierProps {
  onDataSaved?: (supplier: SupplierDetailsModel) => void;
  onError?: (error: ErrorLike | Error) => void;
}

export const useSaveSupplier = ({ onDataSaved, onError }: UseSaveSupplierProps = {}) => {
  return useSaveEntity({
    onDataSaved,
    onError,
    createMutation: registerSupplierMutation,
    updateMutation: updateSupplierDetailsMutation,
    updateResultSelector: (data) => data?.updateSupplierDetails,
    createResultSelector: (data) => data?.registerSupplier,
    saveResultEntitySelector: (data) =>
      data
        ? (('updateSupplierDetails' in data
            ? data?.updateSupplierDetails?.supplier
            : data?.registerSupplier?.supplier) as SupplierDetailsModel)
        : undefined,
  });
};
