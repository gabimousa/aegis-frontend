// Specialized hooks for direct use
export { usePagination } from '../../../../hooks/usePagination/usePagination';
export { useCustomerDetailsQuery } from './useCustomerDetailsQuery';
export { useCustomersQuery } from './useCustomersQuery';
export { useCustomerSubscriptions } from './useCustomerSubscriptions';
export { useDeactivateCustomer } from './useDeactivateCustomer';
export { useSaveCustomer } from './useSaveCustomer';

// Types
export type { UsePaginationReturn } from '../../../../hooks/usePagination/usePagination';
export type { UseCustomerDetailsQueryProps } from './useCustomerDetailsQuery';
export type { UseCustomersQueryProps } from './useCustomersQuery';
export type {
  UseDeactivateCustomerProps,
  UseDeactivateCustomerReturn,
} from './useDeactivateCustomer';
export type { UseSaveCustomerProps } from './useSaveCustomer';
