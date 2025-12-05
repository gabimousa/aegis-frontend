export type Connection<T> = {
  totalCount: number;
  nodes?: Array<T> | null;
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string | null;
    endCursor?: string | null;
  };
};
