import { ErrorLike } from '@apollo/client';
import { PageInfo } from '../../../gql/graphql';
import { UsePaginationReturn } from '../../usePagination';

export interface UseEntitiesQueryReturn<T> extends UsePaginationReturn {
  entities: T[];
  pageInfo?: PageInfo;
  totalCount: number;
  loading: boolean;
  error?: ErrorLike;
  fetchSingleEntity: (id: string) => void;
  removeLocalEntity: (id: string) => void;
  searchTerm?: string;
  setSearchTerm: (term: string | undefined) => void;
}
