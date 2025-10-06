import { useEffect, useState } from 'react';

// Types for the GraphQL response
export interface Supplier {
  id: string;
  code: string;
  name: string;
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
}

export interface SupplierEdge {
  node: Supplier;
  cursor: string;
}

export interface SuppliersConnection {
  edges: SupplierEdge[];
  pageInfo: PageInfo;
  totalCount?: number;
}

export interface SuppliersData {
  suppliers: SuppliersConnection;
}

export interface SuppliersVariables {
  first?: number;
  after?: string;
  last?: number;
  before?: string;
}

export interface UseSuppliersResult {
  data: SuppliersData | null;
  loading: boolean;
  error: string | null;
  refetch: (variables?: SuppliersVariables) => void;
}

const SUPPLIERS_QUERY = `
  query GetSuppliers($first: Int, $after: String, $last: Int, $before: String) {
    suppliers(first: $first, after: $after, last: $last, before: $before) {
      edges {
        node {
          id
          code
          name
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;

export const useSuppliers = (
  variables: SuppliersVariables = { first: 10 }
): UseSuppliersResult => {
  const [data, setData] = useState<SuppliersData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSuppliers = async (queryVariables?: SuppliersVariables) => {
    setLoading(true);
    setError(null);

    const vars = queryVariables || variables;

    try {
      const response = await fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: SUPPLIERS_QUERY,
          variables: vars,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.errors) {
        throw new Error(
          result.errors
            .map((err: { message: string }) => err.message)
            .join(', ')
        );
      }

      setData(result.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  const refetch = (newVariables?: SuppliersVariables) => {
    fetchSuppliers(newVariables);
  };

  return {
    data,
    loading,
    error,
    refetch,
  };
};
