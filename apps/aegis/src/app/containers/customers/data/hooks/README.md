# Customer Data Hooks Refactoring

This document outlines the refactored customer data hooks architecture with improved separation of concerns.

## Problem with Original Code

The original `useCustomersData` and `useCustomerDetailsData` hooks had multiple concerns mixed together:

1. **Data fetching** (GraphQL queries)
2. **Data mutations** (create, update, delete operations)
3. **Pagination logic** (next/previous page handling)
4. **State management** (loading states, error handling)
5. **Business logic** (callbacks, error transformations)

This made the code harder to:

- Test individual concerns
- Reuse pagination logic elsewhere
- Modify query behavior independently from mutations
- Understand what each hook was responsible for

## Refactored Architecture

### Core Specialized Hooks

#### `usePagination.tsx`

**Responsibility**: Pure pagination logic

- Manages pagination state (first, last, before, after)
- Provides navigation functions (nextPage, prevPage)
- Can be reused across different paginated queries

```tsx
const pagination = usePagination({ pageSize: 10 });
// Returns: { variables, nextPage, prevPage, canGoNext, canGoPrevious, resetPagination }
```

#### `useCustomersQuery.tsx`

**Responsibility**: Customer list data fetching

- Integrates with `usePagination` for paginated queries
- Handles search filtering
- Manages query state (loading, error, data)
- Provides pure data fetching without mutations

```tsx
const query = useCustomersQuery({
  pageSize: 10,
  searchTerm: 'John',
  enabled: true,
});
// Returns: customers, pageInfo, loading, error, refetch, pagination functions
```

#### `useCustomerMutations.tsx`

**Responsibility**: Customer list mutations

- Handles customer deactivation
- Manages mutation loading states
- Provides error handling for mutations
- Separated from queries for better testability

```tsx
const mutations = useCustomerMutations({
  onCustomerDeactivated: (id) => console.log('Deactivated:', id),
});
// Returns: { deactivate, deactivatingCustomer, error }
```

#### `useCustomerDetailsQuery.tsx`

**Responsibility**: Single customer data fetching

- Fetches detailed customer information
- Handles conditional fetching (skip when id is 'NEW')
- Manages query state independently

```tsx
const query = useCustomerDetailsQuery({ id: 'customer-123' });
// Returns: { customer, loading, error, refetch }
```

#### `useCustomerDetailsMutations.tsx`

**Responsibility**: Customer details mutations

- Handles both customer registration and updates
- Manages mutation loading states
- Preserves original error handling behavior (throwing grouped errors)
- Provides callbacks for successful operations

```tsx
const mutations = useCustomerDetailsMutations({
  onDataSaved: (customer) => console.log('Saved:', customer),
});
// Returns: { save, saving, error }
```

### Composed Hooks (Backward Compatibility)

#### `useCustomersData.tsx` (Refactored)

**Responsibility**: Composition of query + mutations for customer list

- Uses `useCustomersQuery` + `useCustomerMutations`
- Maintains the same API as before
- Provides backward compatibility

#### `useCustomerDetailsData.tsx` (Refactored)

**Responsibility**: Composition of query + mutations for customer details

- Uses `useCustomerDetailsQuery` + `useCustomerDetailsMutations`
- Maintains the same API as before
- Provides backward compatibility

## Benefits of Refactoring

### 1. **Separation of Concerns**

- Each hook has a single, well-defined responsibility
- Easier to understand and maintain
- Reduces cognitive load when reading code

### 2. **Improved Testability**

- Can test pagination logic independently
- Can test queries without mutation side effects
- Can test mutations without query complexity
- Better isolation for unit testing

### 3. **Better Reusability**

- `usePagination` can be used with any paginated GraphQL query
- Query hooks can be used in read-only scenarios
- Mutation hooks can be used independently for batch operations

### 4. **Enhanced Type Safety**

- More granular type definitions
- Better error type handling with `ErrorLike`
- Clearer interfaces for each hook's purpose

### 5. **Easier Debugging**

- Clear separation makes it easier to isolate issues
- Less state interdependency
- More predictable behavior

### 6. **Future Extensibility**

- Easy to add new mutation types
- Simple to extend pagination with new features
- Straightforward to add caching strategies per concern

## Usage Examples

### Basic Customer List (using composed hook)

```tsx
const { customers, loading, nextPage, prevPage, deactivate } = useCustomersData({
  pageSize: 10,
  searchTerm: 'John',
});
```

### Advanced Customer List (using specialized hooks)

```tsx
const query = useCustomersQuery({ pageSize: 10, searchTerm: 'John' });
const mutations = useCustomerMutations({
  onCustomerDeactivated: refetchQuery,
});

// More control over when mutations happen
// Can combine with other mutation hooks
// Better for complex UIs with multiple mutation sources
```

### Custom Pagination Component

```tsx
const pagination = usePagination({ pageSize: 20 });

// Can be used with any paginated query
const articlesQuery = useQuery(ArticlesQuery, {
  variables: pagination.variables,
});

// Reusable pagination UI
<PaginationControls
  onNext={() => pagination.nextPage(articlesQuery.pageInfo)}
  onPrev={() => pagination.prevPage(articlesQuery.pageInfo)}
  canGoNext={pagination.canGoNext(articlesQuery.pageInfo)}
  canGoPrevious={pagination.canGoPrevious(articlesQuery.pageInfo)}
/>;
```

## Migration Guide

### Existing Code (No Changes Needed)

The refactored hooks maintain full backward compatibility:

```tsx
// This continues to work exactly as before
const customerData = useCustomersData({ pageSize: 10 });
const customerDetails = useCustomerDetailsData({ id: 'customer-123' });
```

### New Code (Can Use Specialized Hooks)

```tsx
// For read-only customer list
const { customers, loading } = useCustomersQuery({ pageSize: 10 });

// For mutation-heavy scenarios
const { deactivate } = useCustomerMutations();

// For custom pagination needs
const pagination = usePagination({ pageSize: 50 });
```

## File Structure

````
data/hooks/
├── index.ts                        # Barrel exports
├── usePagination.tsx              # ✨ Pure pagination logic
├── useCustomersQuery.tsx          # ✨ Customer list fetching
├── useDeactivateCustomer.tsx      # ✨ Customer deactivation
├── useCustomerDetailsQuery.tsx    # ✨ Customer details fetching
├── useSaveCustomer.tsx            # ✨ Customer save (create/update)
├── useCustomerSubscriptions.tsx   # ✅ Real-time subscriptions
└── README.md                      # 📖 This documentation
```**Note**: The original composed hooks (`useCustomersData` and `useCustomerDetailsData`) have been removed. The `CustomersDataContext` now directly orchestrates all specialized hooks for better control and clarity.## Testing Strategy

With the refactored architecture, testing becomes more focused:

```tsx
// Test pagination logic in isolation
describe('usePagination', () => {
  it('should handle next page correctly', () => {
    // Test pure pagination logic without GraphQL complexity
  });
});

// Test queries without mutations
describe('useCustomersQuery', () => {
  it('should fetch customers with search term', () => {
    // Test data fetching without mutation side effects
  });
});

// Test mutations without queries
describe('useCustomerMutations', () => {
  it('should deactivate customer and call callback', () => {
    // Test mutation logic without query complexity
  });
});
````

This refactoring maintains all existing functionality while providing a much cleaner, more maintainable, and more testable architecture.
