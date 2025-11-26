// Specialized hooks for direct use
export { usePagination } from '../../../../hooks/usePagination';
export { useCustomerDetailsQuery } from './useCustomerDetailsQuery';
export { useCustomersQuery } from './useCustomersQuery';
export { useCustomerSubscriptions } from './useCustomerSubscriptions';
export { useDeactivateCustomer } from './useDeactivateCustomer';
export { useSaveCustomer } from './useSaveCustomer';

// Types
export type {
  PaginationState,
  UsePaginationProps,
  UsePaginationReturn,
} from '../../../../hooks/usePagination';
export type {
  UseCustomerDetailsQueryProps,
  UseCustomerDetailsQueryReturn,
} from './useCustomerDetailsQuery';
export type { UseCustomersQueryProps, UseCustomersQueryReturn } from './useCustomersQuery';
export type {
  UseDeactivateCustomerProps,
  UseDeactivateCustomerReturn,
} from './useDeactivateCustomer';
export type { UseSaveCustomerProps, UseSaveCustomerReturn } from './useSaveCustomer';
