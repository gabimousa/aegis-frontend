import { useMutateCache } from '@aegis/shared';
import { print } from 'graphql';
import { useEffect } from 'react';
import { wsClient } from '../../../../shared';
import { CustomerModel } from '../../model';
import {
  CUSTOMER_DEACTIVATED_SUBSCRIPTION,
  CUSTOMER_DETAILS_UPDATED_SUBSCRIPTION,
  CUSTOMER_REGISTERED_SUBSCRIPTION,
  CUSTOMERS_QUERY_KEY,
} from '../graphql';

const registerSubString = print(CUSTOMER_REGISTERED_SUBSCRIPTION);
const updateSubString = print(CUSTOMER_DETAILS_UPDATED_SUBSCRIPTION);
const deactivateSubString = print(CUSTOMER_DEACTIVATED_SUBSCRIPTION);

export const useCustomerSubscriptions = () => {
  const { upsertInfiniteData, updateInInfiniteData, removeFromInfiniteData } =
    useMutateCache<CustomerModel>();

  useEffect(() => {
    // 1. Create the iterators
    const registerIter = wsClient.iterate({ query: registerSubString });
    const updateIter = wsClient.iterate({ query: updateSubString });
    const deactivateIter = wsClient.iterate({ query: deactivateSubString });

    // 2. Start separate async "workers" for each stream
    const subscribeRegister = async () => {
      try {
        for await (const result of registerIter) {
          const data = result.data;
          if (data?.onCustomerRegistered) {
            upsertInfiniteData(
              data.onCustomerRegistered as CustomerModel,
              CUSTOMERS_QUERY_KEY(),
              'customers'
            );
          }
        }
      } catch (err) {
        console.error('Register Sub Error:', err);
      }
    };

    const subscribeUpdate = async () => {
      try {
        for await (const result of updateIter) {
          const data = result.data;
          if (data?.onCustomerDetailsUpdated) {
            updateInInfiniteData(
              data.onCustomerDetailsUpdated as CustomerModel,
              CUSTOMERS_QUERY_KEY(),
              'customers'
            );
          }
        }
      } catch (err) {
        console.error('Update Sub Error:', err);
      }
    };

    const subscribeDeactivate = async () => {
      try {
        for await (const result of deactivateIter) {
          const data = result.data;
          if (data?.onCustomerDeactivated) {
            const id = (data.onCustomerDeactivated as { id: string }).id;
            removeFromInfiniteData(id, CUSTOMERS_QUERY_KEY(), 'customers');
          }
        }
      } catch (err) {
        console.error('Deactivate Sub Error:', err);
      }
    };

    // Run workers
    subscribeRegister();
    subscribeUpdate();
    subscribeDeactivate();

    // 3. Cleanup logic
    const unlisten = wsClient.on('connected', () => console.log('✅ WS Connected'));

    const unlistenErr = wsClient.on('error', (err) =>
      console.error('❌ WS Connection Error:', err)
    );
    const unlistenClose = wsClient.on('closed', () => console.log('🔌 WS Connection Closed'));

    return () => {
      // Calling .return() on the iterator terminates the subscription
      // and breaks the 'for await' loop.
      registerIter.return?.();
      updateIter.return?.();
      deactivateIter.return?.();
      unlisten();
      unlistenErr();
      unlistenClose();
    };
  }, [upsertInfiniteData, removeFromInfiniteData, updateInInfiniteData]);
};
