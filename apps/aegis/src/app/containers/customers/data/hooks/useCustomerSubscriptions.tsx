import { useSubscription } from '@apollo/client/react';
import { CustomerModel } from '../../model/customer.model';
import {
  onCustomerDeactivatedSubscription,
  onCustomerDetailsUpdatedSubscription,
  onCustomerRegisteredSubscription,
} from '../graphql/customersSubscriptions';

type useCustomerSubscriptionsProps = {
  onCustomerRegistered?: (customer: CustomerModel) => void;
  onCustomerUpdated?: (customer: CustomerModel) => void;
  onCustomerDeactivated?: (customerId: string) => void;
};

export const useCustomerSubscriptions = ({
  onCustomerRegistered,
  onCustomerUpdated,
  onCustomerDeactivated,
}: useCustomerSubscriptionsProps) => {
  const {
    data: registeredData,
    restart: restartRegisteredSubscription,
    error: registeredError,
  } = useSubscription(onCustomerRegisteredSubscription, {
    onData(options) {
      const customer = options.data.data?.onCustomerRegistered;
      customer && onCustomerRegistered?.(customer as CustomerModel);
    },
  });

  const {
    data: updateData,
    restart: restartUpdateSubscription,
    error: updateError,
  } = useSubscription(onCustomerDetailsUpdatedSubscription, {
    onData(options) {
      const customer = options.data.data?.onCustomerDetailsUpdated;
      customer && onCustomerUpdated?.(customer as CustomerModel);
    },
  });

  const {
    data: deactivatedData,
    restart: restartDeactivatedSubscription,
    error: deactivatedError,
  } = useSubscription(onCustomerDeactivatedSubscription, {
    onData(options) {
      const customerId = options.data.data?.onCustomerDeactivated;
      customerId && onCustomerDeactivated?.(customerId);
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

export default useCustomerSubscriptions;
