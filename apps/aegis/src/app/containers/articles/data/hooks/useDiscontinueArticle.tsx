import type { ErrorLike } from '@apollo/client';
import { useRemoveEntity } from '@aegis/shared';
import { discontinueArticleMutation } from '../graphql/articlesMutations';

export interface UseDiscontinueArticleProps {
  onArticleDiscontinued?: (articleId: string) => void;
  onError?: (error: ErrorLike | Error) => void;
}

export interface UseDiscontinueArticleReturn {
  discontinue: (articleId: string) => Promise<boolean>;
  discontinuingArticle: boolean;
  error?: ErrorLike | Error;
}

export const useDiscontinueArticle = ({
  onArticleDiscontinued,
  onError,
}: UseDiscontinueArticleProps = {}): UseDiscontinueArticleReturn => {
  const { remove, removingEntity, error } = useRemoveEntity({
    onEntityRemoved: onArticleDiscontinued,
    onError,
    mutation: discontinueArticleMutation,
    mutationResultSelector: (data) => data?.discontinueArticle,
  });

  return { discontinue: remove, discontinuingArticle: removingEntity, error };
};
