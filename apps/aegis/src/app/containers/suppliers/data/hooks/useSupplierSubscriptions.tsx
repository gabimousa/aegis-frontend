import { useSubscription } from '@apollo/client/react';
import { SupplierModel } from '../../model';
import {
  SUPPLIER_DEACTIVATED_SUBSCRIPTION,
  SUPPLIER_DETAILS_UPDATED_SUBSCRIPTION,
  SUPPLIER_REGISTERED_SUBSCRIPTION,
} from '../graphql/suppliersSubscriptions';

type useSupplierSubscriptionsProps = {
  onSupplierRegistered?: (supplier: SupplierModel) => void;
  onSupplierDetailsUpdated?: (supplier: SupplierModel) => void;
  onSupplierDeactivated?: (supplierId: string) => void;
};

export const useSupplierSubscriptions = ({
  onSupplierRegistered,
  onSupplierDetailsUpdated,
  onSupplierDeactivated,
}: useSupplierSubscriptionsProps) => {
  const {
    data: registeredData,
    restart: restartRegisteredSubscription,
    error: registeredError,
  } = useSubscription(SUPPLIER_REGISTERED_SUBSCRIPTION, {
    onData(options) {
      const supplier = options.data.data?.onSupplierRegistered;
      supplier && onSupplierRegistered?.(supplier as SupplierModel);
    },
  });

  const {
    data: updateData,
    restart: restartUpdateSubscription,
    error: updateError,
  } = useSubscription(SUPPLIER_DETAILS_UPDATED_SUBSCRIPTION, {
    onData(options) {
      const supplier = options.data.data?.onSupplierDetailsUpdated;
      supplier && onSupplierDetailsUpdated?.(supplier as SupplierModel);
    },
  });

  const {
    data: deactivatedData,
    restart: restartDeactivatedSubscription,
    error: deactivatedError,
  } = useSubscription(SUPPLIER_DEACTIVATED_SUBSCRIPTION, {
    onData(options) {
      const supplierId = options.data.data?.onSupplierDeactivated.id;
      supplierId && onSupplierDeactivated?.(supplierId);
    },
  });

  return {
    onUpdateData: updateData,
    restartUpdateSubscription,
    updateError,
    registeredData,
    restartRegisteredSubscription,
    registeredError,
    deactivatedData,
    restartDeactivatedSubscription,
    deactivatedError,
  };
};

export default useSupplierSubscriptions;
