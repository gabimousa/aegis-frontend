import { useSaveEntity } from '@aegis/shared';
import type { ErrorLike } from '@apollo/client';
import { ArticleModel } from '../../model';
import {
  registerArticleMutation,
  updateArticleDetailsMutation,
} from '../graphql/articlesMutations';
export interface UseSaveArticleProps {
  onDataSaved?: (article: ArticleModel) => void;
  onError?: (error: ErrorLike | Error) => void;
}

export const useSaveArticle = ({ onDataSaved, onError }: UseSaveArticleProps = {}) => {
  return useSaveEntity({
    onDataSaved,
    onError,
    createMutation: registerArticleMutation,
    updateMutation: updateArticleDetailsMutation,
    updateResultSelector: (data) => data?.updateArticleDetails,
    createResultSelector: (data) => data?.registerArticle,
    saveResultEntitySelector: (data) =>
      data
        ? (('updateArticleDetails' in data
            ? data?.updateArticleDetails?.article
            : data?.registerArticle?.article) as ArticleModel)
        : undefined,
  });
};
