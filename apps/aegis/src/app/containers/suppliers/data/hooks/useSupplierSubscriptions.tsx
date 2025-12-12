import { useSubscription } from '@apollo/client/react';
import { SupplierModel } from '../../model/supplier.model';
import {
  onSupplierDeactivatedSubscription,
  onSupplierDetailsUpdatedSubscription,
  onSupplierRegisteredSubscription,
} from '../graphql/suppliersSubscriptions';

type useSupplierSubscriptionsProps = {
  onSupplierRegistered?: (supplier: SupplierModel) => void;
  onSupplierUpdated?: (supplier: SupplierModel) => void;
  onSupplierDeactivated?: (supplierId: string) => void;
};

export const useSupplierSubscriptions = ({
  onSupplierRegistered,
  onSupplierUpdated,
  onSupplierDeactivated,
}: useSupplierSubscriptionsProps) => {
  const {
    data: registeredData,
    restart: restartRegisteredSubscription,
    error: registeredError,
  } = useSubscription(onSupplierRegisteredSubscription, {
    onData(options) {
      const supplier = options.data.data?.onSupplierRegistered;
      supplier && onSupplierRegistered?.(supplier as SupplierModel);
    },
  });

  const {
    data: updateData,
    restart: restartUpdateSubscription,
    error: updateError,
  } = useSubscription(onSupplierDetailsUpdatedSubscription, {
    onData(options) {
      const supplier = options.data.data?.onSupplierDetailsUpdated;
      supplier && onSupplierUpdated?.(supplier as SupplierModel);
    },
  });

  const {
    data: deactivatedData,
    restart: restartDeactivatedSubscription,
    error: deactivatedError,
  } = useSubscription(onSupplierDeactivatedSubscription, {
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
