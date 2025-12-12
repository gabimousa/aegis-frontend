import type { ErrorLike } from '@apollo/client';
import { useSaveEntity } from '../../../../hooks';
import { SupplierDetailsModel } from '../../model/supplierDetails.model';
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
